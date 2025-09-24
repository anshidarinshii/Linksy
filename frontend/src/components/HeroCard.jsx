import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // make sure you have AuthContext

export default function HeroCard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddResource = () => {
    if (!user) {
      navigate("/auth"); // redirect to login if not logged in
    } else {
      navigate("/add");  // go to add resource page if logged in
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl w-8/12 h-[30vh] pt-4 mx-auto flex flex-col justify-start items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <h1 className="text-3xl font-extrabold text-purple-600">LINKSY</h1>
      <h2 className="text-lg font-bold font-serif text-purple-300">
        Connect Your Community. <br /> Discover Local Resources.
      </h2>
      <button
        onClick={handleAddResource}
        className="mt-6 px-6 py-3 bg-violet-600 text-white font-medium rounded-md shadow-md hover:bg-violet-700 hover:shadow-lg transition"
      >
        + Add New Resource
      </button>
    </div>
  );
}

