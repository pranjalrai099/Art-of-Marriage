import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {toast} from 'react-toastify'
const Navbar = () => {
    const navigate=useNavigate();
    const {token,settoken,userdata}=useContext(AppContext)
    
    const [showMenu,setshowMenu]=useState(false);
    const adminurl=import.meta.env.VITE_ADMIN_URL
   const logout=()=>{
    settoken(false)
    localStorage.removeItem('token')
    toast.info('You are log out succesfully..')
   }
   const handleAdminRedirect = () => {
    if (adminurl) {
      window.location.href = adminurl; // Navigate to the external admin URL
    } else {
      toast.error('Admin URL is not configured!');
    }
  };
    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img onClick={()=>{navigate('/')}} className='w-44 cursor-pointer ' src="https://tse2.mm.bing.net/th?id=OIP.AcqZsyLcVvnoxdgVWnfoLAHaDW&pid=Api&P=0&h=180" alt="" />
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1'>Home</li>
                    <hr className='border-none outline-none h-0.5 bg-pink-400 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to={'/vendors'}>
                    <li className='py-1'>ALL VENDORS</li>
                    <hr className='border-none outline-none h-0.5 bg-pink-400 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to={'/about'}>
                    <li className='py-1'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-pink-400 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to={'/contact'}>
                    <li className='py-1'>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-pink-400 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to={'/donation'}>
                    <li className='py-1'>FIND & BUY</li>
                    <hr className='border-none outline-none h-0.5 bg-pink-400 w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {token && userdata ?
                <div className='flex items-center gap-2 cursor-pointer group relative '>
                    <img className='w-8 rounded-full' src={userdata.image} alt='' />
                    <img className='w-2.5' src={assets.dropdown_icon} alt='' />
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4  '>
                             <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                             <p onClick={()=>navigate('/my-appointment')} className='hover:text-black cursor-pointer '>My Appointments</p>
                             <p onClick={logout} className='hover:text-black cursor-pointer '>Logout</p>
                        </div>
                        </div>
                </div> :<button onClick={()=> navigate('/login')} className='bg-pink-500 text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button> 
                }
                <img onClick={()=>setshowMenu(true)} className=' cursor-pointer w-6 md:hidden' src={assets.menu_icon} alt=''/>
            <div className={` ${showMenu?'fixed w-full': 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6'>
                    <img className='cursor-pointer w-36' src={assets.logo} alt=''/>
                    <img className='cursor-pointer w-7' onClick={()=>setshowMenu(false)} src={assets.cross_icon} alt=''/>
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                <NavLink onClick={()=>setshowMenu(false)} to={'/'} ><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
                <NavLink onClick={()=>setshowMenu(false)} to={'/vendors'} ><p className='px-4 py-2 rounded inline-block'>All DOCTORS</p></NavLink>
                <NavLink onClick={()=>setshowMenu(false)} to={'/about'} ><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
                <NavLink onClick={()=>setshowMenu(false)} to={'/contact'} ><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
                <NavLink onClick={()=>setshowMenu(false)} to={'/donation'} ><p className='px-4 py-2 rounded inline-block'>DONATION</p></NavLink>
                </ul>
            </div>
            <button
  onClick={() => {
    if (adminurl) {
      window.open(adminurl, '_blank'); // Open admin URL in a new tab
    } else {
      toast.error('Admin URL is not configured!');
    }
  }}
  className="p-2 rounded-full border border-pink-500 text-xl w-32"
>
  Admin
</button>

            </div>
        </div>
    )
}

export default Navbar