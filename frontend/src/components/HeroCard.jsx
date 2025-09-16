import React from "react";
import { Link } from "react-router-dom";

export default function HeroCard() {
  return (
    <div
    >
      <h1>
        Connect Your Community. <br /> Discover Local Resources.
      </h1>

      <Link to="/add">
        <button>
          + Add New Resource
        </button>
      </Link>
    </div>
  );
}