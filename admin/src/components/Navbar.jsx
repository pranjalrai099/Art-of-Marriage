import React, { useContext } from 'react'
import { assets} from '../assets/assets_admin/assets.js'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { VendorContext } from '../context/VendorContext.jsx'
const Navbar = () => {
    const {atoken,setatoken}=useContext(AdminContext)
    const {dtoken,setdtoken}=useContext(VendorContext)
    const logout=()=>{
        navigate('/')
       atoken && setatoken('')
       atoken && localStorage.removeItem('atoken')
       dtoken && setdtoken('')
       dtoken && localStorage.removeItem('dtoken')
    }
    const navigate=useNavigate();
  return (
    <div className='flex justify-between items-center bg-white px-4 sm:px-10 py-3 border-b'>
     <div className='flex items-center gap-1 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src="https://tse2.mm.bing.net/th?id=OIP.AcqZsyLcVvnoxdgVWnfoLAHaDW&pid=Api&P=0&h=180" alt=''/>
        <p className='border border-pink-400 px-2.5 py-0.5 rounded-full  text-gray-600'>{atoken? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-pink-500 text-white text-sm px-10 py-2 rounded-full '>LogOut</button>   
    </div>
  )
}

export default Navbar