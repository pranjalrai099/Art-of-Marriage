import axios from 'axios';
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

export const SellForm = () => {
    const { backendurl, token } = useContext(AppContext);

    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [age, setage] = useState('');
    const [gender, setgender] = useState('');
    const [Itemtype, setItemtype] = useState('');
    const [ItemName, setItemName] = useState('');
    const [image, setimage] = useState(null);
    const [description, setdescription] = useState('');
    const [upiid, setupiid] = useState('');

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('Itemtype', Itemtype);
        formData.append('ItemName', ItemName);
        formData.append('description', description);
        formData.append('upiid', upiid);
        if (image) {
            formData.append('image', image);
        }

        try {
            const { data } = await axios.post(
                `${backendurl}/apiback/user/sell-user`,
                formData,
                { headers: { token } }
            );
            toast.success('Your wedding item has been listed successfully!');
            setfirstname('');
            setlastname('');
            setemail('');
            setimage('');
            setphone('');
            setage('');
            setItemtype('');
            setgender('');
            setItemName('');
            setdescription('');
            setupiid('');
        } catch (error) {
            console.error('Submission failed:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Submission failed");
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 flex items-center justify-center py-10 px-4'>
            <div className='bg-white shadow-xl rounded-2xl p-10 w-full max-w-4xl'>
                <h2 className='text-4xl font-extrabold text-center text-pink-600 mb-2'>
                    List Your Wedding Dress or Ornament
                </h2>
                <p className='text-center text-gray-500 mb-10'>
                    Have a wedding dress, sherwani, or ornament you no longer need?  
                    Share your beautiful item with someone who needs it.  
                    Fill out this form to list your item for donation or support.  
                    Let your special memory become part of someone else's big day!
                </p>
                <form onSubmit={handleSubmit} className='space-y-6'>

                    {/* Name */}
                    <div className='md:flex gap-6'>
                        <div className='w-full'>
                            <label className='block mb-1 text-gray-600'>First Name</label>
                            <input value={firstname} onChange={(e) => setfirstname(e.target.value)} className='input' type='text' placeholder='First name' required />
                        </div>
                        <div className='w-full'>
                            <label className='block mb-1 text-gray-600'>Last Name</label>
                            <input value={lastname} onChange={(e) => setlastname(e.target.value)} className='input' type='text' placeholder='Last name' required />
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className='md:flex gap-6'>
                        <div className='w-full'>
                            <label className='block mb-1 text-gray-600'>Email</label>
                            <input value={email} onChange={(e) => setemail(e.target.value)} className='input' type='email' required />
                        </div>
                        <div className='w-full'>
                            <label className='block mb-1 text-gray-600'>Phone Number</label>
                            <input value={phone} onChange={(e) => setphone(e.target.value)} className='input' type='tel' required />
                        </div>
                    </div>

                    {/* Personal Info */}
                    <div className='md:flex gap-6'>
                        <div className='w-full'>
                            <label className='block mb-1 text-gray-600'>Age</label>
                            <input value={age} onChange={(e) => setage(e.target.value)} className='input' type='number' min='18' required />
                        </div>
                        <div className='w-full'>
                            <label className='block mb-1 text-gray-600'>Gender</label>
                            <select value={gender} onChange={(e) => setgender(e.target.value)} className='input' required>
                                <option value=''>Select</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Other'>Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Item Info */}
                    <div className='md:flex gap-6'>
                        <div className='w-full'>
                            <label className='block mb-1 text-gray-600'>Item Type</label>
                            <select value={Itemtype} onChange={(e) => setItemtype(e.target.value)} className='input' required>
                                <option value=''>Select</option>
                                <option value='Dress'>Wedding Dress</option>
                                <option value='Ornament'>Ornament/Jewelry</option>
                                <option value='Other'>Other Wedding Item</option>
                            </select>
                        </div>
                        <div className='w-full'>
                            <label className='block mb-1 text-gray-600'>Item Name</label>
                            <input value={ItemName} onChange={(e) => setItemName(e.target.value)} className='input' type='text' placeholder='e.g., Sherwani, Lehenga, Necklace' required />
                        </div>
                    </div>

                    {/* UPI & Image */}
                    <div className='md:flex gap-6'>
                        <div className='w-full'>
                            <label className='block mb-1 text-gray-600'>UPI ID (optional)</label>
                            <input value={upiid} onChange={(e) => setupiid(e.target.value)} className='input' type='text' placeholder='yourname@upi' />
                        </div>
                        <div className='w-full'>
                            <label className='block mb-1 text-gray-600'>Upload Item Photo</label>
                            <input onChange={(e) => setimage(e.target.files[0])} className='input' type='file' accept='image/*' />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className='block mb-1 text-gray-600'>Item Description</label>
                        <textarea value={description} onChange={(e) => setdescription(e.target.value)} className='input h-32 resize-none' placeholder='Describe the condition, size, and any special details'></textarea>
                    </div>

                    <div className='text-center'>
                        <button type='submit' className='bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300'>
                            List My Wedding Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
