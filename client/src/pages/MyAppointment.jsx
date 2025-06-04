import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyAppointment = () => {
  const { backendurl, token,getVendorData } = useContext(AppContext);
  const [appointments, setappointments] = useState([]);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const navigate=useNavigate();
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const getuserappointments = async () => {
    try {
      const { data } = await axios.get(backendurl + '/apiback/user/appointment', { headers: { token } });
      console.log(data);
      if (data.success) {
        setappointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelappointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendurl + '/apiback/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getuserappointments(); // Refresh the appointments after cancellation
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
      
        try {
          const { data } = await axios.post(
            `${backendurl}/apiback/user/verify-razorpay`,
            response, // Send Razorpay's response object
            { headers: { token } }
          );
          if (data.success) {
            toast.success(data.message);
            getuserappointments();
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Error during payment verification:", error);
          toast.error(error.response?.data?.message || error.message);
        }
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };  
 const AppointmentRazorpay=async(appointmentId)=>{
   try {
    const {data}=await axios.post(backendurl+'/apiback/user/payment-razorpay',{appointmentId},{headers:{token}})
    if(data.success){
      initPay(data.order)
      console.log(data.order);
    }

   } catch (error) {
    
   }
 }
  useEffect(() => {
    if (token) {
      getuserappointments();
    }
  }, [token]); // Correct dependency array for useEffect
 console.log("ad",appointments.vendData);
   return appointments.length>0 && (
    <div>
      <p className='pb-3 mt-12 border-b text-zinc-700 font-medium'>My appointments</p>
      <div>
        { appointments.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'>
            <div>
              <img className='w-32 bg-indigo-50' src={item.vendData.image} alt='' />
            </div>
            <div>
              <p className='flex-1 text-sm text-zinc-600'>{item.vendData.name}</p>
              <p className='text-neutral-800 font-semibold'>{item.vendData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.vendData.address.line1}</p>
              <p className='text-xs'>{item.vendData.address.line2}</p>
              <p className='text-xs mt-1'>
                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className=' md:ml-32 lg:ml-96 p-3 flex flex-col gap-2 justify-end'>
              {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button> }
             {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={()=>AppointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-pink-500 hover:text-white transition-all duration-300'>
                Pay Online
              </button> }
              {!item.cancelled && !item.isCompleted && <button
                onClick={() => cancelappointment(item._id)} // Wrap the function in an arrow function
                className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'
              >
                Cancel Appointment
              </button> }
              {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500 '>Appointment Cancelled</button>}
              {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 text-green-500 '>Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
