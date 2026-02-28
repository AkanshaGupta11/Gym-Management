import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'

function Login() {
  const [loginField , setLoginField] = useState({"userName" : "" , "password":""});
  const nav = useNavigate();

  const handleLogin = async() => {
    // localStorage.setItem("isLogin",true);
    // nav('/dashboard')

    await axios.post('http://localhost:4000/auth/login',loginField , {withCredentials:true})
    .then((resp) => {
      console.log(resp?.data?.data);
      localStorage.setItem('gymName',resp.data.data.gymName);
      localStorage.setItem('gymPic',resp.data.data.profilePic);
      localStorage.setItem('isLogin',true);
      localStorage.setItem('token',resp.data.token);

      nav('/dashboard');
    })
    .catch(err => {
      // const errMssg = err.response.data.error
      //console.log(err.response?.data?.message);
      toast.error(err.response?.data?.message || "Login failed");
      //toast.error(errMssg);
    })
  }

  const handleOnChange = (event, name) => {
    setLoginField({...loginField , [name]:event.target.value})
  }

  //console.log("loginfield",loginField);
  return (
    <div className='w-full lg:w-[450px] flex flex-col items-center bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-2xl shadow-xl'>
        <div className='text-3xl text-white font-light mb-8'>Login</div>
        <input type="text" 
        value = {loginField.userName}
        onChange={(event) => {handleOnChange(event , "userName")}}
        className='w-full mb-6 p-3 rounded-lg bg-white outline-none' 
        placeholder='Enter Username'/>

        <input type="password" 
        value = {loginField.password}
        onChange={(event) => {handleOnChange(event , "password")}}
        className='w-full mb-10 p-3 rounded-lg bg-white outline-none' placeholder='Enter Password'/>

        <button className='p-3 w-full bg-slate-800 text-white rounded-lg text-lg hover:bg-white hover:text-black font-semibold transition-all
        ' onClick={handleLogin}>
            Login
        </button>
        <ToastContainer/>
    </div>
  )
}

export default Login