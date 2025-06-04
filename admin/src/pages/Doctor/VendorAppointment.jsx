import React from 'react'
import { useContext } from 'react'
import {  VendorContext } from '../../context/VendorContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const VendorAppointment = () => {
    const {dtoken,appointments,getappointments,  cancelAppointment,completeAppointment,}=useContext(VendorContext)
    const {calculatedage, slotDateFormat,currency}=useContext(AppContext)
    useEffect(()=>{
        getappointments()
    },[dtoken])
    console.log("ad",appointments);
  return (
    <div className='w-full max-w-6xl m-5'>
        <p className='mb-3 text-lg font-medium'>All Appointments</p>
        <div className='bg-white corder rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll  '>
            <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr]'>
                <p>#</p>
                <p>Client</p>
                <p>Payment</p>
                <p>Age</p>
                <p>Date & Time</p>
                <p>Fees</p>
                <p>Action</p>
            </div>
            {
                appointments.reverse().map((item,index)=>(
                    <div className='flex flex-wrap justify-between max-sm:gap-5  max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 px-6 py-3 border-b hover:bg-gray-50' key={index}>
                        <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2 '>
                <img className='w-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
                </div>
                <div>
                    <p className='text-xs inline border border-pink-500 rounded-full px-2'>
                        {item.payment ? 'ONLINE':'CASH' }
                    </p>
                    </div>
                    <p className='max-sm:hidden'>{calculatedage(item.userData.dob)}</p>
                    <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
                    <p>{currency}{item.amount}</p>
                    {
                        item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.isCompleted ?<p className='text-green-500 text-xs font-medium' >Completed</p> : <div className='flex'>
                        <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                        <img onClick={()=>completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                        </div>
                    }
                    
                        </div>
                ))
            }
        </div>
    </div>
  )
}


export default VendorAppointment