import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const { settoken, backendurl } = useContext(AppContext);
  const [otp, setOtp] = useState('');
  const email = localStorage.getItem('otp_email');
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const { data } = await axios.post(`${backendurl}/apiback/user/verify-otp`, { email, otp });

      if (data.success) {
        localStorage.setItem('token', data.token);
        settoken(data.token);
        localStorage.removeItem('otp_email');
        toast.success('OTP verified successfully!');
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Invalid OTP or server error');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100'>
      <div className='flex flex-col gap-4 items-start p-8 sm:w-[400px] w-[90%] bg-white border border-pink-200 rounded-xl shadow-2xl text-zinc-700 font-[Georgia]'>
        <p className='text-3xl text-rose-600 font-bold tracking-wide w-full text-center'>Art of Marriage</p>
        <p className='text-xl text-rose-500 font-semibold w-full text-center'>OTP Verification</p>
        <p className='text-center w-full text-sm'>
          Enter the OTP sent to <span className='font-medium text-rose-600'>{email}</span>
        </p>
        <input
          type='text'
          className='border border-rose-200 rounded w-full p-2 text-center focus:outline-none focus:ring-2 focus:ring-rose-300'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder='Enter OTP'
        />
        <button
          onClick={handleVerify}
          className='bg-rose-500 hover:bg-rose-600 text-white w-full py-2 rounded-md transition-all duration-200 ease-in-out shadow-md'
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default Verification;
