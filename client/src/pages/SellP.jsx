import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const SellPage = () => {
  const { backendurl } = useContext(AppContext);
  const [sells, setsells] = useState([]);  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchsells = async () => {
      try {
        const response = await axios.get(`${backendurl}/apiback/user/sell-get`);
        setsells(response.data.sells || []);
      } catch (error) {
        console.error('Error fetching sells:', error);
        setsells([]); 
      }
    };

    fetchsells();
  }, [backendurl]);

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl text-center text-gray-800 mb-10">Wedding Items for Sale</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        {sells.length > 0 ? (
          sells.map((sell) => (
            <div key={sell._id} className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition duration-300">
              <img 
                src={sell.image} 
                alt="Wedding Item" 
                className="w-full h-72 object-cover"
              />
              <div className="p-3 flex justify-between items-center">
                {/* Display Organ Name if donortype is "Organ", otherwise display sell type */}
                <p className="text-2xl font-semibold text-gray-800">
                  {sell.Itemtype}
                </p>
                <button 
                  onClick={() => navigate(`/donate/${sell._id}`)}
                  className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-400 transition duration-300 shadow-md"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">No wedding items available for sale</p>
        )}
      </div>
    </div>
  );
};
