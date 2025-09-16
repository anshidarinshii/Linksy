import React from "react";
import { Link } from "react-router-dom";

export default function HeroCard() {
  return (
    <div className="bg-white shadow-xl rounded-xl w-8/12 h-[30vh] pt-4 mx-auto flex flex-col justify-start items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <h1 className="text-3xl font-extrabold text-purple-600">LINKSY</h1>
      <h2 className="text-lg font-bold font-serif text-purple-300">
        Connect Your Community. <br /> Discover Local Resources.
      </h2>

      <Link to="/add">
        <button className="mt-6 px-6 py-3 bg-violet-600 text-white font-medium rounded-md shadow-md hover:bg-violet-700 hover:shadow-lg transition">
          + Add New Resource
        </button>
      </Link>
    </div>
  );
}
