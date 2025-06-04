import React, { useState } from 'react'
import { assets } from '../assets/assets_frontend/assets.js'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import {toast} from 'react-toastify'
const MyProfile = () => {
  const {userdata,setuserdata,token,backendurl,loadUserpROFILE}=useContext(AppContext)
  const [isedit, setisedit] = useState(false)
  const [image,setimage]=useState(false);
  const updateprofiledata=async()=>{
     try {
      const formData=new FormData()
       formData.append('name',userdata.name)
       formData.append('phone',userdata.phone)
       formData.append('address',JSON.stringify(userdata.address))
       formData.append('gender',userdata.gender)
       formData.append('dob',userdata.dob)
       image && formData.append('image',image)

       const {data}=await axios.post(backendurl+'/apiback/user/update-profile',formData,{headers:{token}})
       if(data.success){
        toast.success(data.message);
       await loadUserpROFILE()
       setisedit(false)
       setimage(false)
       } else{
        toast.error(data,message)
       }
     } catch (error) {
      console.log(error)
      toast.error(error.message)
     }
  }
  console.log(userdata.address);
  return userdata && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      {isedit ? <label htmlFor='image'>
  <div className='inline-block relative cursor-pointer'>
    <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userdata.image } alt=''/>
    <img className='w-10 absolute bottom-12 right-12' src={image ? '': assets.upload_icon } alt=''/>
  </div>
  <input onChange={(e)=>setimage(e.target.files[0])} type='file' id='image' hidden />
      </label> : <img className='w-36' src={userdata.image} alt='' />}

      {isedit ?
        <input className='bg-gray-100 text-3xl font-medium max-w-60 mt-4 border border-gray-400 rounded' type='text' value={userdata.name}
          onChange={(ev) => setuserdata(prev => ({ ...prev, name: ev.target.value }))} /> :
        <p className='font-medium text-3xl mt-4 text-neutral-800 '>{userdata.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3 '>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700 '>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userdata.email}</p>
          <p className='font-medium'>Phone:</p>
          {isedit ?
            <input className='border border-gray-400 rounded bg-gray-100 max-w-52' type="tel" value={userdata.phone}
              onChange={(ev) => setuserdata(prev => ({ ...prev, phone: ev.target.value }))} /> :
            <p className='text-blue-400'>{userdata.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {isedit ?
            <p>
             <input
  className="border border-gray-400 rounded bg-gray-100 mb-2"
  onChange={(ev) =>
    setuserdata(prev => ({
      ...prev,
      address: { ...prev.address, line1: ev.target.value }, // Update line1 while keeping other fields intact
    }))
  }
  value={userdata.address?.line1 || ''} // Add a fallback to avoid "undefined" errors
  type="text"
/>
<br />
<input
  className="border border-gray-400 rounded bg-gray-100"
  onChange={(ev) =>
    setuserdata(prev => ({
      ...prev,
      address: { ...prev.address, line2: ev.target.value }, // Update line2 while keeping other fields intact
    }))
  }
  value={userdata.address?.line2 || ''} // Add a fallback to avoid "undefined" errors
  type="text"
/>
            </p> :
            <p className='text-gray-500'>{userdata.address.line1}
              <br />
              {userdata.address.line2}
            </p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {isedit ?
            <select className='border border-gray-400 rounded max-w-20 bg-gray-100' onChange={(ev) => setuserdata(prev => ({ ...prev, gender: ev.target.value }))} value={userdata.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            :
            <p className='text-gray-400'>{userdata.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {isedit?
          <input className='border border-gray-400 rounded max-w-28 bg-gray-100' type='date' onChange={(ev)=>setuserdata(prev=>({...prev,dob:ev.target.value}))} value={userdata.dob} />:
          <p className='text-gray-400'>{userdata.dob}</p>}
        </div>
      </div>
      <div className='mt-10'>
        {isedit?
        <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={updateprofiledata}>Save Information</button>:
        <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={()=>setisedit(true)}>Edit</button>}
      </div>
    </div>
  )
}

export default MyProfile