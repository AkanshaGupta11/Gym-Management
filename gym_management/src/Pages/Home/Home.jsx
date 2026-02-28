import React from 'react'
import Login from '../../components/core/Login'
import Signup from '../../components/core/Signup'
import { useState } from 'react'
import Modal from '../../components/Modal/Modal'
import ForgotPass from '../../components/ForgotPassword/ForgotPass'

const Home = () => {
  const [showModal, setShowModal] = useState(false);


  return (
    <div className='w-full h-screen flex flex-col'>
      <div className='border-b-2 border-slate-900 bg-slate-800 text-white p-5 font-semibold text-xl shrink-0'>
        Welcome to Gym Management System
      </div>
      <div className=' w-full grow bg-cover bg-center relative flex justify-center items-center bg-[url("https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg")]'>
        <div className="absolute inset-0 bg-black/40"></div>
        {/* login box  */}
        <div className='relative z-10 w-full max-w-6xl mx-4 p-6'>
          
          <div className='flex flex-col lg:flex-row gap-12 justify-center items-start'>
            <Login />
            {/* Vertical Divider for large screens */}
            <div className='hidden lg:block w-[1px] bg-white/20 self-stretch my-10'></div>
            <Signup openModal={() => setShowModal(true)}/>
          </div>
        </div>
            {showModal && <Modal header ="Forgot Password" handleClose={() => setShowModal(false)} content = {<ForgotPass/>} />}
      </div>
    </div>

  )
} 

export default Home