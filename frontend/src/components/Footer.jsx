import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-white text-purple-700 py-6 mt-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Left Side Links */}
        <div className="flex space-x-6 text-sm font-medium">
          <a href="#" className="hover:text-black transition-colors">
            CommunityConnect
          </a>
          <a href="#" className="hover:text-black transition-colors">
            Resources
          </a>
          <a href="#" className="hover:text-black transition-colors">
            Legal
          </a>
          <a href="#" className="hover:text-black transition-colors">
            Contact Us
          </a>
        </div>

        {/* Right Side Social Icons */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="#"
            className="hover:text-purple-800 transform hover:scale-125 transition-transform duration-300"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="#"
            className="hover:text-purple-800 transform hover:scale-125 transition-transform duration-300"
          >
            <FaXTwitter size={20} />
          </a>
          <a
            href="#"
            className="hover:text-purple-800 transform hover:scale-125 transition-transform duration-300"
          >
            <FaLinkedinIn size={20} />
          </a>
          <a
            href="#"
            className="hover:text-purple-800 transform hover:scale-125 transition-transform duration-300"
          >
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
