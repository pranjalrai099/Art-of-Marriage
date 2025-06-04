import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { VendorContext } from '../context/VendorContext'

const Login = () => {
  const [state,setstate]=useState('Admin')
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('');
  const {setatoken,backendurl}=useContext(AdminContext)
  const {dtoken,setdtoken}=useContext(VendorContext)
 const onsubmithandle=async(event)=>{
      event.preventDefault()
      try{
    
        if(state==='Admin'){
          const {data}=await axios.post(backendurl+'/apiback/admin/login',{email,password})     
          if(data.success){
            localStorage.setItem('atoken',data.token)
           setatoken(data.token)
          }
          else{
            toast.error(data.message)
          }
        }
        else{
          const {data}=await axios.post(backendurl+'/apiback/vendor/login',{email,password})
          if(data.success){
            localStorage.setItem('dtoken',data.token)
           setdtoken(data.token)
           console.log(data.token)
          }
          else{
            toast.error(data.message)
          }
        }
      }
      catch{
       console.log(error);
      }
 }
  return (
    <form onSubmit={onsubmithandle} className='min-h-[80vh] flex items-center'>
    <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
      <p className='text-2xl font-semibold m-auto'><span className='text-pink-400'>{state} </span>Login</p>
      <div className='w-full'>
        <p>Email</p>
        <input 
        onChange={(ev)=>setemail(ev.target.value)} 
        value={email}
         className='border border-[#DADADA] rounded w-full p-2 mt-1'
          type='email' required />
      </div>
      <div className='w-full'>
        <p>Password</p>
        <input 
        onChange={(ev)=>setpassword(ev.target.value)} 
        value={password} 
        className='border border-[#DADADA] rounded w-full p-2 mt-1'
         type='password' required />
      </div>
      <button  className='bg-pink-500 text-white w-full py-2 rounded-md text-base '>Login</button>
   {state==='Admin' ?
   <p>Vendor Login?  <span className='text-pink-400 underline cursor-pointer' onClick={()=>setstate('Vendor')}>Click here</span></p>
  : <p>Admin Login?  <span className='text-pink-400 underline cursor-pointer' onClick={()=>setstate('Admin')}>Click here</span></p> }
    </div>
    
    </form>
  )
}

export default Login