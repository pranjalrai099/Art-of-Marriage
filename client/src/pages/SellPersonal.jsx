import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

export const SellPersonal = () => {
  const { sellId } = useParams();
  const { backendurl } = useContext(AppContext);
  const [sell, setsell] = useState(null);

  useEffect(() => {
    const fetchsellDetails = async () => {
      try {
        const response = await axios.post(`${backendurl}/apiback/user/sell-getbyId`, { sellId });
        setsell(response.data);
      } catch (error) {
        console.error('Error fetching sell details:', error);
      }
    };

    fetchsellDetails();
  }, [sellId, backendurl]);

  if (!sell) {
    return <p className="text-center text-lg text-gray-600">Loading sell details...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white rounded-xl w-full max-w-4xl shadow-xl overflow-hidden">
        {/* Image Section */}
        <img
          src={sell.image}
          alt="Item"
          className="w-full h-72 object-cover rounded-t-xl shadow-md" // Adjusted image size here
        />
        
        {/* Content Section */}
        <div className="p-8 space-y-6">
          {/* Title */}
          <h2 className="text-4xl font-bold text-center text-gray-900 tracking-wide">
            {sell.firstname} {sell.lastname}
          </h2>
          
          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-gray-800">
              <p className="text-lg font-semibold">Age:</p>
              <p className="text-xl">{sell.age} years</p>
            </div>
            <div className="text-gray-800">
              <p className="text-lg font-semibold">Item Type:</p>
              <p className="text-xl">{sell.Itemtype}</p>
            </div>

            {/* Item Name Section */}
            <div className="text-gray-800">
              <p className="text-lg font-semibold">Item Name:</p>
              <p className="text-xl">{sell.ItemName}</p>
            </div>

            <div className="text-gray-800 col-span-2">
              <p className="text-lg font-semibold">Description:</p>
              <p className="text-xl">{sell.description}</p>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded-lg col-span-2 shadow-sm">
              <p className="text-lg font-semibold">Contact Information:</p>
              <p className="text-gray-900">📧 Email: {sell.email}</p>
              <p className="text-gray-900">📞 Phone: {sell.phone}</p>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <p className="text-lg font-semibold">Payment Information:</p>
              <p className="text-gray-900">UPI Id: {sell.upiid}</p>
            </div>
          </div>

          {/* Action Section */}
          <div className="mt-6">
            <button className="w-full bg-pink-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-pink-700 transition duration-300 shadow-lg">
            Please contact the seller directly for further details.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
