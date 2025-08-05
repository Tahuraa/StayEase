import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-blue-600">StayEase</h1>
      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li className="hover:text-blue-600 cursor-pointer">Home</li>
        <li className="hover:text-blue-600 cursor-pointer">My Bookings</li>
        <li className="hover:text-blue-600 cursor-pointer">Profile</li>
        <li className="hover:text-blue-600 cursor-pointer">Logout</li>
        <li className="hover:text-blue-600 cursor-pointer">Help</li>
        <li className="hover:text-blue-600 cursor-pointer">About</li>
        <li className="hover:text-blue-600 cursor-pointer">Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;

