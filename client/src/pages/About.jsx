import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>About <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='flex flex-col md:flex-row gap-12 my-10'>
        <img className='w-full md:max-w-[360px]' src="https://www.weddingsutra.com/images/Vendor_Images/Wedding_Planners/b3-event/b3-event09.jpg" alt='' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-base text-gray-600'>
          <p>At <b className="text-gray-800">ART OF Marriage</b>, we transform your wedding dreams into timeless realities. Our platform is a one-stop destination that simplifies wedding planning by connecting you with the best professionals, venues, and services to craft your perfect day.</p>
          <p>Whether you're looking for decorators, photographers, caterers, or bridal makeup artists, we’ve got you covered. Our user-friendly interface allows couples to browse curated vendors, check availability, compare packages, and manage bookings effortlessly – all in one place.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission is to redefine wedding planning by making it smooth, enjoyable, and stress-free. At ART OF Marriage, we’re dedicated to supporting couples through every step of their journey — from first click to final vows — ensuring that your big day is nothing short of magical.</p>
        </div>
      </div>
      <div className='mb-8 text-xl text-gray-600'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 text-gray-700 flex-col gap-5 text-[16px] hover:bg-pink-400 hover:text-white transition-all duration-300 cursor-pointer'>
          <b>Expertise:</b>
          <p>Our team brings years of experience in curating picture-perfect weddings across themes, budgets, and traditions.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex-col gap-5 text-[16px] hover:bg-pink-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience:</b>
          <p>Book and manage all your wedding services online without the hassle of multiple vendors and negotiations.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex-col gap-5 text-[16px] hover:bg-pink-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personal Touch:</b>
          <p>Get customized recommendations and inspiration tailored to your love story, culture, and preferences.</p>
        </div>
      </div>
    </div>
  )
}

export default About
