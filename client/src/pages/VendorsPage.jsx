import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import  { AppContext } from '../context/AppContext';

const VendorsPage = () => {
  const {speciality}=useParams();
  const [filterDoc,setfilterDoc]=useState([]);
  const [showfilter,setshowfilter]=useState(false);
  const navigate=useNavigate();
 const {vendors}=useContext(AppContext);
 console.log(vendors);
 console.log("s",speciality);
  const applyFilter=()=>{
    if(speciality){
      setfilterDoc(vendors.filter(doc=> doc.speciality===speciality))
    }
    else{
      setfilterDoc(vendors)
    }
  }
  useEffect(()=>{
 applyFilter()
  },[vendors,speciality])
  console.log(speciality);
  return (
    <div>
     <p className='text-gray-600'>Browse through the vendors specialist.</p>
    <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
      <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showfilter? 'bg-pink-300 text-white': ''} `} onClick={()=>setshowfilter(prev=>!prev)}>Filters</button>
      <div className={`flex flex-col gap-3 text-sm text-gray-600 ${showfilter? 'flex':'hidden sm:flex'}`}>
        <p onClick={()=>speciality==='Photographer' ? navigate('/vendors') : navigate('/vendors/Photographer')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Photographer"? "bg-pink-200 text-black" : ""} `}>Photographer</p>
        <p onClick={()=>speciality==='Electrician' ? navigate('/vendors') : navigate('/vendors/Electrician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Electrician"? "bg-pink-200 text-black" : ""} `}>Electrician</p>
        <p onClick={()=>speciality==='Make-Up' ? navigate('/vendors') : navigate('/vendors/Make-Up')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Make-Up"? "bg-pink-200 text-black" : ""} `}>Make-Up</p>
        <p onClick={()=>speciality==='DJs' ? navigate('/vendors') : navigate('/vendors/DJs')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="DJs"? "bg-pink-200 text-black" : ""} `}>DJ Operator</p>
        <p onClick={()=>speciality==='Artist' ? navigate('/vendors') : navigate('/vendors/Artist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Artist"? "bg-pink-200 text-black" : ""} `}>Artist</p>
        <p onClick={()=>speciality==='Coordinator' ? navigate('/vendors') : navigate('/vendors/Coordinator')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Coordinator"? "bg-pink-200 text-black" : ""} `}>Coordinator</p>
        <p onClick={()=>speciality==='Cheif' ? navigate('/vendors') : navigate('/vendors/Cheif')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Cheif"? "bg-pink-200 text-black" : ""} `}>Cheif</p>
        <p onClick={()=>speciality==='Decorators' ? navigate('/vendors') : navigate('/vendors/Decorators')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality==="Decorators"? "bg-pink-200 text-black" : ""} `}>Decorators</p>
      </div>
      <div className='w-full grid grid-cols-auto gap-4 gap-y-6  '>
       {filterDoc.map((item,index)=>(
             <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50' src={item.image} alt=''/>
                <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-600' }`}>
                    <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-600' }  rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                    </div>
                    <p className='text-pink-700 text-lg font-medium '>{item.name}</p>
                    <p className='text-gray-800 text-sm '>{item.speciality}</p>
                </div>
                </div>
            ))
          }
      </div>
    </div>
    </div>
  )
}

export default VendorsPage
