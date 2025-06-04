import React, { useContext } from 'react'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointment from './pages/Admin/AllAppointment';
import vendorsList from './pages/Admin/VendorsList';
import {  VendorContext } from './context/VendorContext';
import VendorProfile from './pages/Doctor/VendorProfile';
import VendorAppointment from './pages/Doctor/VendorAppointment';
import AddVendor from './pages/Admin/AddVendor';
import VendorList from './pages/Admin/VendorsList';
import VendorDashboard from './pages/Doctor/VendorDashboard';
const App = () => {
  const {atoken}=useContext(AdminContext)
   const {dtoken}=useContext(VendorContext)
  return atoken || dtoken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar/>  
      <div className='flex items-start'>
        <SideBar/>
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllAppointment/>} />
          <Route path='/add-vendor' element={<AddVendor/>} />
          <Route path='/vendor-list' element={<VendorList/>} />
          {/* // Doctor Route */}
          <Route path='/vendor-dashboard' element={<VendorDashboard/>} />
          <Route path='/vendor-profile' element={<VendorProfile/>} />
          <Route path='/vendor-appointments' element={<VendorAppointment/>} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
     <Login/>
     <ToastContainer />
    </>
  )
}

export default App