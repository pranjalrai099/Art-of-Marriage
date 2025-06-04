import React from 'react';
import { useNavigate } from 'react-router-dom';

const BannerPage = () => {
  const navigate = useNavigate();
  return (
    <div className='relative w-full h-[80vh] rounded-lg overflow-hidden mt-16'>
      {/* Background Image */}
      <img
        className='w-full h-full object-cover filter-none'
        src='https://mycodelesswebsite.com/wp-content/uploads/2021/02/Best-Wedding-Planner-Websites-1080x628.jpg'
        alt='Wedding Planner'
      />

      {/* Overlay Content */}
      <div className='absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between items-center text-center'>
        {/* Text Content */}
        <div className='flex flex-col justify-center items-center mt-20'>
          <h1 className='text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight'>
            Your Perfect Wedding Starts Here
          </h1>
          <p className='text-white text-sm sm:text-base mt-4'>
            Connect with top vendors, planners, and experts to create your dream wedding.
          </p>
        </div>

        {/* Button at the bottom */}
        <button
          onClick={() => {
            navigate('/login');
            scrollTo(0, 0);
          }}
          className='bg-white text-sm sm:text-base text-gray-700 px-8 py-3 rounded-full mb-6 hover:scale-105 transition-all duration-300'
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default BannerPage;
