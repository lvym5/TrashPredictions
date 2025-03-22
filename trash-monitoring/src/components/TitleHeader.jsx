import React from 'react';
import logo from '../assets/logo_real.png'; // Adjust the path as needed

export default function TitleHeader() {
  return (
    <div className="bg-white px-6 py-0.5 shadow-md border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <img
          src={logo}
          alt="Logo"
          className="h-[140px] w-[250px] object-contain"
        />
        {/* <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600 tracking-wide">
          Absolute Trash Predictor
        </h1> */}
      </div>
    </div>
  );
}
