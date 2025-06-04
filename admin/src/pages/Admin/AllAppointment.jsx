import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets.js'


const AllAppointment = () => {
  const {appointments,getallappointments,atoken, cancelappointment}=useContext(AdminContext)
  const {calculatedage,slotDateFormat,currency}=useContext(AppContext)
  
   useEffect(()=>{
   if(atoken){
    getallappointments()
   }
   },[atoken])
   console.log(appointments);
   return (
    <div className="w-full max-w-6xl mx-auto my-5 p-4 bg-gray-50 rounded-lg shadow-lg">
      <p className="mb-5 text-xl font-semibold text-gray-700">All Appointments</p>
      <div className="bg-white border rounded-lg shadow-sm text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_2fr_2.5fr_1fr_1fr] grid-flow-col py-3 px-6 border-b bg-gray-100 text-gray-600 font-medium">
          <p>#</p>
          <p>Client</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Vendor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.reverse().map((item, index) => (
          <div
            className="flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_2.5fr_1fr_2fr_2.5fr_1fr_1fr] items-center text-gray-700 py-3 px-6 border-b hover:bg-gray-50"
            key={index}
          >
            <p className="hidden sm:block">{index + 1}</p>
            <div className="flex items-center gap-3">
              <img
                className="w-10  rounded-full object-cover"
                src={item.userData.image}
                alt="Patient"
              />
              <p className="text-gray-800 font-medium">{item.userData.name}</p>
            </div>
            <p className="hidden sm:block">{calculatedage(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
            <div className="flex items-center gap-3">
              <img
                className="w-10  rounded-full object-cover bg-gray-200"
                src={item.vendData.image}
                alt="Patient"
              />
              <p className="text-gray-800 font-medium">{item.vendData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> :
             <img onClick={()=> cancelappointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default AllAppointment