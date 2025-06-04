import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const FooterPage = () => {
  return (
    <div className='md:mx-10'>
       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* ----Left Section */}
        <div>
         
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi totam ex perspiciatis blanditiis delectus atque ea consequatur iusto harum illo voluptas consectetur laborum accusamus, commodi eos voluptate temporibus porro cumque.</p>
        </div>
         {/* ----Centre Section */}
         <div>
           <p className='text-xl font-medium mb-5'>Company</p>
           <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact</li>
            <li>Privacy policy</li>
           </ul>
         </div>
          {/* ----Right Section */}
          <div>
         <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
         <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+1-238-873-709-732</li>
            <li>pranjalkrai2004@gmail.com</li>
         </ul>
          </div>
        </div> 
        {/* ----Copyright Symbol------ */}
        <div>
          <hr />
          <p className='py-5 text-center text-sm'>Copyright 2024@ Prescripto - All Right Reserved.</p> 
        </div>
    </div>

  )
}

export default FooterPage