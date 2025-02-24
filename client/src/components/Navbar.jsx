import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 shadow-2xl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold hover:text-gray-200 transition duration-300 transform hover:scale-105">
          REMOVEBG
        </Link>

        {/* Main Navigation Links */}
        <ul className="flex space-x-8">
          <li>
            <Link to="/" className="text-white hover:text-gray-200 transition duration-300 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/upload" className="text-white hover:text-gray-200 transition duration-300 hover:underline">
              Remove Background
            </Link>
          </li>
        </ul>

        {/* Auth Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;