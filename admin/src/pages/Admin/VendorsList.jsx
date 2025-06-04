import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const VendorList = () => {
  const {vendors,atoken,getallVendors,changeavailability}=useContext(AdminContext)
  
  useEffect(()=>{
   if(atoken){
    getallVendors()
   }
  },[atoken])
console.log(vendors);
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
     <h1 className='text-lg font-medium'>All vendors</h1>
     <div className='flex flex-wrap w-full gap-4 pt-5 gap-y-6  '>
    { vendors.length>0 &&  vendors.map((item,index)=>(
      <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer grow' key={index}>
      <img className='bg-indigo-50 hover:bg-primary transition-all duration-500' src={item.image} alt="" />
      <div className='p-4  '>
        <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
        <p className='text-zinc-600 text-sm'>{item.speciality}</p>
        <div className='mt-2 flex items-center gap-1 text-sm '>
          <input onChange={()=>changeavailability(item._id)} type='checkbox' checked={item.available} />
          <p>Available</p>
          </div>
        </div>
      </div>
    ))}
    </div>
    </div>
  )
}

export default VendorList