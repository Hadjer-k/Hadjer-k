import React from "react";
import logo from "../../assets/logo.webp"; // replace with your logo
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 bg-transparent z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src={logo}
          alt="Logo"
          className="h-10 w-10 object-cover rounded-full"
        />
        <span className="text-xl font-bold text-[#030301] drop-shadow-md">
          CDI Bouira
        </span>
      </div>

      {/* Links */}
      <ul className="flex space-x-8 text-lg font-medium">
        {/* Home always highlighted */}
        <li className="cursor-pointer text-[#030301] font-bold underline underline-offset-4">
          <a href="#home">Home</a>
        </li>

        <li className="cursor-pointer text-[#030301] hover:text-[#030301] hover:underline underline-offset-4 transition">
          <a href="#about">About Us</a>
        </li>
        <li className="cursor-pointer text-[#030301] hover:text-[#030301] hover:underline underline-offset-4 transition">
          <a href="#services">Our Services</a>
        </li>
        <li className="cursor-pointer text-[#030301] hover:text-[#030301] hover:underline underline-offset-4 transition">
          <a href="#contact">Contact Us</a>
        </li>
        <li className="cursor-pointer text-[#030301] hover:text-[#030301] hover:underline underline-offset-4 transition">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
