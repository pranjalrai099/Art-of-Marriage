import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Topvendors = () => {
    const navigate=useNavigate();
    const {vendors}=useContext(AppContext);
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 '>
<div className='text-center'>
        <h1 className='text-4xl md:text-5xl font-semibold text-pink-600 mb-2 drop-shadow-sm'>
          Trusted Experts for Your Special Day
        </h1>
        <p className='sm:w-2/3 md:w-1/2 mx-auto text-gray-600 text-base'>
          Whether it’s for beauty, health, or wellness—our curated professionals ensure your wedding goes flawlessly.
        </p>
      </div>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {vendors.length>0 && vendors.slice(0,8).map((item,index)=>(
             <div onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} className='border border-black-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-pink-300' src={item.image} alt=''/>
                <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-600' }`}>
                    <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-600' }  rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                    </div>
                    <p className='text-pink-700 text-2xl font-medium '>{item.name}</p>
                    <p className='text-gray-800 text-sm '>{item.speciality}</p>
                </div>
                </div>
            ))}
        </div>
        <button onClick={()=>{navigate('/vendors'); scrollTo(0,0)  }} className='bg-gray-200 text-gray-600 px-12 py-3 rounded-full mt-10  '>more</button>
    </div>
  )
}

export default Topvendors