import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Auth() {
  const [state, setState] = useState("login"); // "login" or "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // support redirect back to original page e.g. /auth?redirect=/add-resource
  const redirectTo = new URLSearchParams(location.search).get("redirect") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (state === "register") {
        await register(name, email, password);
        // optional: auto-switch to login screen
        setState("login");
        setName("");
        setPassword("");
        setEmail("");
        alert("Account created. Please login.");
      } else {
        const res = await login(email, password); // sets token + user in context
        // redirect to original page or home
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || err.message || "Auth failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
    >
      <p className="text-2xl font-medium m-auto">
        <span className="text-indigo-500">User</span>{" "}
        {state === "login" ? "Login" : "Sign Up"}
      </p>

      {state === "register" && (
        <div className="w-full">
          <p>Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="text"
            required
          />
        </div>
      )}

      <div className="w-full ">
        <p>Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type="email"
          required
        />
      </div>
      <div className="w-full ">
        <p>Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type="password"
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm w-full text-center">{error}</p>}

      {state === "register" ? (
        <p>
          Already have account?{" "}
          <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">
            click here
          </span>
        </p>
      ) : (
        <p>
          Create an account?{" "}
          <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">
            click here
          </span>
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer disabled:opacity-50"
      >
        {loading ? "Please wait..." : state === "register" ? "Create Account" : "Login"}
      </button>
    </form>
  );
}
