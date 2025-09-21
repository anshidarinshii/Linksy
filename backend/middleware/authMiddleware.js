const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // Get token from Authorization header or cookies
  let token = req.header("Authorization");
  if (token && token.startsWith("Bearer ")) {
    token = token.replace("Bearer ", "");
  } else if (req.cookies?.token) {
    token = req.cookies.token; // optional if you set cookies later
  }

  // No token provided
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded; // attach user info (like id) to request
    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);
    return res.status(401).json({ error: "Token is not valid or expired" });
  }
}

module.exports = authMiddleware;
