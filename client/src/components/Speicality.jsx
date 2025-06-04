import React from 'react';
import { Link } from 'react-router-dom';

const SpecialityBox = () => {
  return (
    <div className="w-full bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500 py-16 text-center mt-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Our Achievements</h2>
      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
        <div className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-lg">
          <h2 className="text-4xl font-semibold text-pink-600">500+</h2>
          <p className="text-gray-600 text-sm md:text-base mt-2">Weddings Handled</p>
        </div>
        <div className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-lg">
          <h2 className="text-4xl font-semibold text-pink-600">800+</h2>
          <p className="text-gray-600 text-sm md:text-base mt-2">Happy Clients</p>
        </div>
        <div className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-lg">
          <h2 className="text-4xl font-semibold text-pink-600">50+</h2>
          <p className="text-gray-600 text-sm md:text-base mt-2">Top Vendors</p>
        </div>
        <div className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-lg">
          <h2 className="text-4xl font-semibold text-pink-600">10+</h2>
          <p className="text-gray-600 text-sm md:text-base mt-2">Years of Experience</p>
        </div>
      </div>
    </div>
  );
};

export default SpecialityBox;
