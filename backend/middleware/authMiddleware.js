const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Checks for a valid JWT and attaches the user object
async function protect(req, res, next) {
  let token = req.header("Authorization");

  if (token && token.startsWith("Bearer ")) {
    token = token.replace("Bearer ", "");
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;       // { id: "...", role: "...", etc. }
    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);
    return res.status(401).json({ error: "Token is not valid or expired" });
  }
}

// Ensures that the user has the admin role
async function adminOnly(req, res, next) {
  try {
    // Option 1: If you put `role` in the token at sign-in, check it:
    if (req.user.role === "admin") {
      return next();
    }

    // Option 2: If you only stored the user id in the token, load the user:
    const user = await User.findById(req.user.id);
    if (user && user.role === "admin") {
      return next();
    }

    return res.status(403).json({ error: "Admin access required" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { protect, adminOnly };
