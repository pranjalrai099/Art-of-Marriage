import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const HeaderPage = () => {
  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] rounded-lg overflow-hidden shadow-md">
      {/* Background Image */}
      <img
        src="https://png.pngtree.com/thumb_back/fw800/background/20240704/pngtree-new-event-management-outdoor-background-image_15957681.jpg"
        alt="Wedding Event Background"
        className="w-full h-full object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4 md:px-10">
        <h1 className="text-white text-2xl md:text-4xl font-semibold drop-shadow mb-4">
          Celebrate Love with the Perfect Wedding Plan
        </h1>
        <p className="text-white text-base md:text-lg max-w-2xl mb-6">
          Connect with trusted wedding professionals for venues, decoration, catering, makeup, photography, and more.
        </p>
        <a
          className="bg-white text-pink-500 px-6 py-3 rounded-full font-medium hover:bg-pink-500 hover:text-white transition-all duration-300"
        >
          Explore Services
        </a>
      </div>
    </div>
  )
}

export default HeaderPage