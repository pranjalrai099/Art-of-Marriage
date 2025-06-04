import React from 'react'
import { useContext } from 'react'
import  { VendorContext } from '../../context/VendorContext.jsx'
import { useEffect } from 'react'
import { assets } from '../../assets/assets_admin/assets.js';
import { AppContext } from '../../context/AppContext.jsx';
const VendorDashboard = () => {
    const {dtoken,getdashdata, dashdata,setdashdata,cancelAppointment,completeAppointment}=useContext(VendorContext)
    const {currency,slotDateFormat}=useContext(AppContext)
    useEffect(()=>{
    if(dtoken){
        getdashdata()
    }
    },[dtoken])
  return dashdata && (
    <div className='m-5'>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{currency} {dashdata.earnings}</p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashdata.appointments}</p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">{dashdata.patients}</p>
              <p className="text-gray-400">Clients</p>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white">
            <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
              <img src={assets.list_icon} alt="" />
              <p className="font-semibold">Latest Bookings</p>
            </div>
            <div className="pt-4 border border-t-0">
              {dashdata.latestAppointments.length > 0 &&
                dashdata.latestAppointments.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100">
                    <img
                      className="w-10 rounded-full object-cover"
                      src={item.userData.image}
                      alt="Vendor"
                    />
                    <div className="flex-1 text-sm">
                      <p className="font-medium text-gray-800">{item.userData.name}</p>
                      <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                    </div>
                    {
                        item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.isCompleted ?<p className='text-green-500 text-xs font-medium' >Completed</p> : <div className='flex'>
                        <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                        <img onClick={()=>completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                        </div>
                    }
                  </div>
                ))}
            </div>
          </div>
        </div>
    </div>
  )
}


export default VendorDashboard