import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import RelatedVendors from '../components/RelatedVendors';

const Appointment = () => {
  const { vendId } = useParams();
  const { vendors, currencySymbol, backendurl, token, getVendorData } = useContext(AppContext);
  const daysofweek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [vendInfo, setvendInfo] = useState(null);
  const [vendSlot, setvendSlot] = useState([]);
  const [slotindex, setslotsindex] = useState(0);
  const [slotTime, setslotTime] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchvendInfo = async () => {
    console.log(vendId);
    const info = vendors.find(doc => doc._id === vendId);
    setvendInfo(info);
  };

  const getavailableslot = async () => {
    if (!vendInfo) return;
    setvendSlot([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let cuurrentdate = new Date(today);
      cuurrentdate.setDate(today.getDate() + i);
      let endtime = new Date();
      endtime.setDate(today.getDate() + i);
      endtime.setHours(21, 0, 0, 0);

      if (today.getDate() === cuurrentdate.getDate()) {
        cuurrentdate.setHours(cuurrentdate.getHours() > 10 ? cuurrentdate.getHours() + 1 : 10);
        cuurrentdate.setMinutes(cuurrentdate.getMinutes() > 30 ? 30 : 0);
      } else {
        cuurrentdate.setHours(10);
        cuurrentdate.setMinutes(0);
      }

      let timeslot = [];

      while (cuurrentdate < endtime) {
        let formattedTime = cuurrentdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let day = cuurrentdate.getDate();
        let month = cuurrentdate.getMonth() + 1;
        let year = cuurrentdate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable = !(vendInfo?.slot_booked?.[slotDate]?.includes(slotTime));

        if (isSlotAvailable) {
          timeslot.push({
            datetime: new Date(cuurrentdate),
            time: formattedTime
          });
        }

        cuurrentdate.setMinutes(cuurrentdate.getMinutes() + 30);
      }

      setvendSlot(prev => [...prev, timeslot]);
    }
  };

  const BookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }

    setLoading(true); // loader start

    try {
      const date = vendSlot[slotindex][0].datetime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const { data } = await axios.post(
        `${backendurl}/apiback/user/book-appointment`,
        { vendId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getVendorData();
        navigate('/my-appointment');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setLoading(false); // loader end
  };

  useEffect(() => {
    fetchvendInfo();
  }, [vendors, vendId]);

  useEffect(() => {
    if (vendInfo) getavailableslot();
  }, [vendInfo]);
 console.log("DF",vendInfo);
  return vendInfo && (
    <div>
      {/* ---vendors Details */}
      <div className='flex flex-col sm:flex-row gap-5'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg ' src={vendInfo.image} alt='' />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 '>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {vendInfo.name}
            <img className='w-5' src={assets.verified_icon} alt='' />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{vendInfo.degree}-{vendInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{vendInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About
              <img src={assets.info_icon} alt='' />
            </p>
            <p className='text-sm text-gray-600 mt-1 max-w-[700px]'>{vendInfo.about}</p>
          </div>
          <p className='mt-4 flex gap-2 text-gray-500 font-medium  '>Appointment Fee:
            <span className='text-gray-600'>{currencySymbol}{vendInfo.fee}</span></p>
        </div>
      </div>

      {/* ------Booking slots---- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 '>
          {vendSlot.length > 0 && vendSlot.map((item, index) =>
            <div onClick={() => setslotsindex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotindex === index ? 'bg-pink-500 text-white' : 'border border-gray-200'}`} key={index}>
              <p>{item[0] && daysofweek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          )}
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {vendSlot.length > 0 && vendSlot[slotindex]?.map((item, index) => (
            <p onClick={() => setslotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-pink-500 text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={BookAppointment}
          disabled={loading || !slotTime}
          className={`bg-pink-600 text-white text-sm font-light px-14 py-3 rounded-full my-6 flex items-center justify-center gap-2 ${loading || !slotTime ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <>
              <span className="loader border-white"></span> Booking...
            </>
          ) : 'Book an appointment'}
        </button>
      </div>

      <RelatedVendors vendId={vendId} speciality={vendInfo.speciality} />

      {/* Loader Spinner CSS */}
      <style>{`
        .loader {
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-right: 2px solid white;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Appointment;
