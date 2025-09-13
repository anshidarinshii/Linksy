import React from "react";
import Navbar from "./components/Navbar";

const App = () => {
  console.log("Rendering App");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
      <Navbar />
      <main className="text-center text-purple-800 py-20">
      </main>
    </div>
  );
};

export default App;
