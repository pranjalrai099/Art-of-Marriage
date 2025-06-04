import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { token, settoken, backendurl } = useContext(AppContext);
  const [state, setstate] = useState('Sign Up');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [name, setname] = useState('');
  const [loading, setLoading] = useState(false); // 🔄 Loader state
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true); // show loader
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendurl + '/apiback/user/register', { name, email, password });
        if (data.success) {
          localStorage.setItem('otp_email', email);
          navigate('/verification');
          toast.success('OTP sent to your email...');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendurl + '/apiback/user/login', { email, password });
        if (data.success) {
          localStorage.setItem('otp_email', email);
          navigate('/verification');
          toast.success('OTP sent to your email...');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false); // hide loader
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Log in'}</p>
        <p>Please {state === 'Sign Up' ? 'Sign Up' : 'Sign in'} to book appointments.</p>

        {state === 'Sign Up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input
              className='border border-zinc-300 rounded w-full p-2 m-1'
              type='text'
              value={name}
              onChange={(ev) => setname(ev.target.value)}
              required
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 m-1'
            type='email'
            value={email}
            onChange={(ev) => setemail(ev.target.value)}
            required
          />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 m-1'
            type='password'
            value={password}
            onChange={(ev) => setpassword(ev.target.value)}
            required
          />
        </div>

        <button
          type='submit'
          className='bg-pink-500 text-white w-full py-2 rounded-md text-base disabled:opacity-60'
          disabled={loading} // disable while loading
        >
          {loading ? 'Please wait...' : state === 'Sign Up' ? 'Create Account' : 'Log in'}
        </button>

        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span onClick={() => setstate('Log In')} className='text-pink-500 underline cursor-pointer'>
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
            <span onClick={() => setstate('Sign Up')} className='text-pink-500 underline cursor-pointer'>
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
