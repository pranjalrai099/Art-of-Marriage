import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';
import { VendorContext } from '../context/VendorContext';

const SideBar = () => {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(VendorContext);

  return (
    <div className="min-h-screen bg-white border-r sm:w-64 md:w-72">
      {atoken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-pink-200 border-r border-pink-500' : ''
              }`
            }
            to="/admin-dashboard"
          >
            {({ isActive }) => (
              <>
                <img
                  className={`block ${isActive ? 'w-8 h-8' : 'w-6 h-6'}`}
                  src={assets.home_icon}
                  alt=""
                />
                <p className="hidden md:block">Dashboard</p>
              </>
            )}
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-pink-200 border-r border-pink-500' : ''
              }`
            }
            to="/all-appointments"
          >
            {({ isActive }) => (
              <>
                <img
                  className={`block ${isActive ? 'w-8 h-8' : 'w-6 h-6'}`}
                  src={assets.appointment_icon}
                  alt=""
                />
                <p className="hidden md:block">Appointment</p>
              </>
            )}
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-pink-200 border-r border-pink-500' : ''
              }`
            }
            to="/add-vendor"
          >
            {({ isActive }) => (
              <>
                <img
                  className={`block ${isActive ? 'w-8 h-8' : 'w-6 h-6'}`}
                  src={assets.add_icon}
                  alt=""
                />
                <p className="hidden md:block">Add Vendor</p>
              </>
            )}
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-pink-200 border-r border-pink-500' : ''
              }`
            }
            to="/vendor-list"
          >
            {({ isActive }) => (
              <>
                <img
                  className={`block ${isActive ? 'w-8 h-8' : 'w-6 h-6'}`}
                  src={assets.people_icon}
                  alt=""
                />
                <p className="hidden md:block">Vendor List</p>
              </>
            )}
          </NavLink>
        </ul>
      )}

      {dtoken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-pink-200 border-r border-pink-500' : ''
              }`
            }
            to="/vendor-dashboard"
          >
            {({ isActive }) => (
              <>
                <img
                  className={`block ${isActive ? 'w-8 h-8' : 'w-6 h-6'}`}
                  src={assets.home_icon}
                  alt=""
                />
                <p className="hidden md:block">Dashboard</p>
              </>
            )}
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-pink-200 border-r border-pink-500' : ''
              }`
            }
            to="/vendor-appointments"
          >
            {({ isActive }) => (
              <>
                <img
                  className={`block ${isActive ? 'w-8 h-8' : 'w-6 h-6'}`}
                  src={assets.appointment_icon}
                  alt=""
                />
                <p className="hidden md:block">Appointment</p>
              </>
            )}
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-pink-200 border-r border-pink-500' : ''
              }`
            }
            to="/vendor-profile"
          >
            {({ isActive }) => (
              <>
                <img
                  className={`block ${isActive ? 'w-8 h-8' : 'w-6 h-6'}`}
                  src={assets.people_icon}
                  alt=""
                />
                <p className="hidden md:block">Profile</p>
              </>
            )}
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default SideBar;
