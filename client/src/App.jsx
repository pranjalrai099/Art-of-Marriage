import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointment from './pages/MyAppointment';
import Appointment from './pages/Appointment';
import LayoutPage from './pages/LayoutPage';
import Navbar from './components/Navbar';
import FooterPage from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {SellPage } from './pages/SellP';
import { SellPersonal } from './pages/SellPersonal';
import Verification from './pages/Verific';
import VendorsPage from './pages/VendorsPage';
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/vendors' element={<VendorsPage />} />
        <Route path='/donation' element={<SellPage />} />
        <Route path='/donate/:sellId' element={<SellPersonal />} />
        <Route path='/vendors/:speciality' element={<VendorsPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointment' element={<MyAppointment />} />
        <Route path='/appointment/:vendId' element={<Appointment />} />
        <Route path='/verification' element={<Verification />} />
      </Routes>
      <FooterPage/>
    </div>
  );
};

export default App;
