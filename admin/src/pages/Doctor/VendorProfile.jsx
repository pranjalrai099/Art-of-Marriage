import React, { useContext, useEffect, useState } from 'react'
import {  VendorContext } from '../../context/VendorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const VendorProfile = () => {
    const { backendurl, profile, setprofile, getprofileData, dtoken } = useContext(VendorContext)
    const { currency } = useContext(AppContext)
    const [isedit, setisedit] = useState(false)

    useEffect(() => {
        if (dtoken) {
            getprofileData()
        }
    }, [dtoken])

    const handleEdit = () => {
        setisedit(true)
    }
  console.log(profile);
    const updateProfile = async () => {
        try {
            const updatedata = {
                address: profile.address, // Ensure address structure is correct
                fee: profile.fee,
                available: profile.available, // Use correct value for 'available'
            }
            const { data } = await axios.post(
                `${backendurl}/apiback/vendor/update`,
                updatedata,
                { headers: { dtoken } }
            )
            if (data.success) {
                toast.success(data.message)
                setisedit(false)
                getprofileData() // Refresh profile data after saving
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    const handleInputChange = (e, field) => {
        const { value, type, checked } = e.target
        if (field === 'address') {
            const [line1, line2] = value.split('\n')
            setprofile((prev) => ({
                ...prev,
                address: { line1, line2 },
            }))
        } else {
            setprofile((prev) => ({
                ...prev,
                [field]: type === 'checkbox' ? checked : value, // Handle checkbox as boolean
            }))
        }
    }

    return profile && (
        <div>
            <div className='flex flex-col gap-4 m-5'>
                <div>
                    <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profile.image} alt="" />
                </div>
                <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profile.name}</p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{profile.degree} - {profile.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{profile.experience}</button>
                    </div>
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
                        <p className='mt-1 max-w-[700px] text-sm text-gray-600'>
                            {isedit ? (
                                <textarea
                                    className='w-full'
                                    value={profile.about}
                                    onChange={(e) => handleInputChange(e, 'about')}
                                />
                            ) : (
                                profile.about
                            )}
                        </p>
                    </div>
                    <p className='text-gray-600 font-medium mt-4'>Appointment Fee: 
                        <span className='text-gray-800'>
                            {isedit ? (
                                <input
                                    type='number'
                                    value={profile.fee}
                                    onChange={(e) => handleInputChange(e, 'fee')}
                                />
                            ) : (
                                `${currency} ${profile.fee}`
                            )}
                        </span>
                    </p>
                    <div className='flex gap-2 py-2'>
                        <p>Address:</p>
                        <p className='text-sm'>
                            {isedit ? (
                                <>
                                    <input
                                        type='text'
                                        className='w-full'
                                        value={profile.address.line1 || ''}
                                        onChange={(e) => handleInputChange(e, 'address.line1')}
                                    />
                                    <input
                                        type='text'
                                        className='w-full'
                                        value={profile.address.line2 || ''}
                                        onChange={(e) => handleInputChange(e, 'address.line2')}
                                    />
                                </>
                            ) : (
                                <>
                                    {profile.address.line1}
                                    <br />
                                    {profile.address.line2}
                                </>
                            )}
                        </p>
                    </div>
                    <div className='flex gap-1 pt-2'>
                        <input
                            checked={profile.available}
                            type='checkbox'
                            onChange={(e) => handleInputChange(e, 'available')}
                        />
                        <label htmlFor=''>Available</label>
                    </div>
                    <div className='flex gap-2 pt-4'>
                        {isedit ? (
                            <button
                                onClick={updateProfile}
                                className='px-4 py-1 border border-primary text-sm rounded-full hover:bg-blue-600 hover:text-white transition-all'>
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={handleEdit}
                                className='px-4 py-1 border border-primary text-sm rounded-full hover:bg-blue-600 hover:text-white transition-all'>
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorProfile
