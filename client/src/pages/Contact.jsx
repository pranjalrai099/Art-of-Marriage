import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { SellForm } from './SellForm'
const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>Contact <span className='text-gray-700 font-semibold'>US</span></p>
      </div>
      <div className='my-8 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px] ' src="https://www.grandweddings.co.in/wp-content/uploads/2020/01/Wedding-Event.jpg" alt=''/>
        <div className='flex flex-col justify-center items-start gap-5'>
          <p className='font-semibold text-lg text-gray-600 '>OUR OFFICE</p>
          <p className='text-gray-500'>Bhavishya Nidhi Bhavan<br/> New Block No. 10<br/> Navnagar Hubli-580025</p>
          <p className='text-gray-500'>Tel:(47) 564-3689 <br/>Email:pranjalkrai2004@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600'>Careers at <b className='text-pink-500'>ART OF Marriage</b></p>
          <p className='text-gray-500'>Learn more about the team and the job openings..</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
     <SellForm/>
    </div>
  )
}

export default Contact