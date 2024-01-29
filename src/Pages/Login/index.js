import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const loginData = await res.json()
    console.log(loginData)
    console.log(loginData.token)

    if (loginData.error) {
      toast.error(loginData.error)
    } else {
      navigate('/')
      toast.success(loginData.success)
      localStorage.setItem('token', loginData.token)
    }

    setEmail("")
    setPassword("")
  }

  return (
    <>
      <div className='flex justify-center'>
        <h1 className='font-bold text-5xl mt-7'>ENoteBook</h1>
      </div>
      <div className='flex justify-center items-center h-screen'>

        <div className='bg-[#d2cbbf] shadow-md px-10 py-10 rounded-xl'>
          <div className=''>
            <h1 className='text-center text-black text-xl mb-4 font-bold'>Login</h1>
          </div>
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              name='email'
              className='bg-[#beb9b1] border border-green-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg'
              placeholder='Email'
            />
          </div>
          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className='bg-[#beb9b1] border border-green-700 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
              placeholder='Password'
            />
          </div>
          <div className='flex justify-center mb-3'>
            <button className='bg-green-700 w-full text-white font-bold px-2 py-2 rounded-lg' onClick={handleLogin}>Login</button>
          </div>
          <div>
            <h2 className='text-black'>Don't have an account <Link className=' text-red-700 font-bold' to={'/signup'}>Signup</Link></h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
