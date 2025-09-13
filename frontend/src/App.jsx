import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  console.log("Rendering App");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow text-center text-purple-800 py-20">
        <h1 className="text-4xl font-bold">Welcome to Linksy</h1>
        <p className="mt-4 text-lg">Your community resource platform</p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
