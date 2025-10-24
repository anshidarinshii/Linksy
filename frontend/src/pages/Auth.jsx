import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FiAlertCircle } from "react-icons/fi";
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
  const redirectTo =
    new URLSearchParams(location.search).get("redirect") || "/";

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
      className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-600 rounded-lg shadow-2xl border border-gray-200 bg-white transition-all duration-300"
    >
      <h1 className="text-3xl font-bold m-auto mb-4 text-gray-800">
        <span className="text-purple-600">User</span>{" "}
        {state === "login" ? "Login" : "Sign Up"}
      </h1>

      <div
        className={`w-full transition-all duration-500 ease-in-out overflow-hidden ${
          state === "register" ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <label htmlFor="name" className="font-medium">
          Name
        </label>
        <input
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Your Name"
          className="border border-gray-300 rounded w-full p-2 mt-1 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
          type="text"
          required={state === "register"}
        />
      </div>

      <div className="w-full ">
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="you@example.com"
          className="border border-gray-300 rounded w-full p-2 mt-1 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
          type="email"
          required
        />
      </div>
      <div className="w-full ">
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <input
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="••••••••"
          className="border border-gray-300 rounded w-full p-2 mt-1 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
          type="password"
          required
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative w-full flex items-center gap-2">
          <FiAlertCircle className="text-red-500" />
          <span className="block sm:inline text-sm">{error}</span>
        </div>
      )}

      <p className="text-sm text-center w-full mt-2">
        {state === "register"
          ? "Already have an account? "
          : "Don't have an account? "}
        <button
          type="button"
          onClick={() => setState(state === "login" ? "register" : "login")}
          className="font-semibold text-purple-600 hover:text-purple-800 focus:outline-none focus:underline transition-colors duration-300"
        >
          {state === "register" ? "Login" : "Sign Up"}
        </button>
      </p>

      {/* This is a spacer, you can remove the old toggle */}
      {/* {state === "register" ? (
        <p className="text-sm">
          Already have an account?{" "}
          <span
            onClick={() => setState("login")}
            className="text-purple-600 cursor-pointer"
          >
            click here
          </span>
        </p>
      ) : (
        <p className="text-sm">
          Create an account?{" "}
          <span
            onClick={() => setState("register")}
            className="text-purple-600 cursor-pointer"
          >
            click here
          </span>
        </p>
      )} */}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition-all duration-300 text-white w-full py-2.5 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center"
      >
        {loading
          ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          )
          : state === "register"
          ? "Create Account"
          : "Login"}
      </button>
    </form>
  );
}
