import React, { useState } from 'react'
import Loader from '../Loader/Loader';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
function ForgotPass() {

    const [emailSubmit , setEmailSubmit] = useState(false);
    const[otpValidate , setOtpValidate] = useState(false);
    const [contentVal , setContentVal] = useState("Send Otp")
    const [inputField , setInputField] = useState({email :"" , otp :"" , newPassword :""})
    const [loader , setLoader] = useState(false)

    const handleSubmit = () => {
        if(!emailSubmit){
            sendOtp();
        }

        else if( emailSubmit && !otpValidate){ 
            verifyOtp();
        }
        else{
            changePassword();
        }
    }
    
    const sendOtp = async() => {
        setLoader(true)
        await axios.post('http://localhost:4000/auth/reset-password/sendOtp',{email:inputField.email})
        .then((resp) => {
            setEmailSubmit(true);
            setContentVal("Submit Otp")
            toast.success(resp.data.message)
            setLoader(false)
        })
        .catch(err => {
            toast.error("Some Technical issue while sending mail")
            console.log(err)
            setLoader(false)
        })

    }


    const verifyOtp = async() => {
        setLoader(true)
        await axios.post('http://localhost:4000/auth/reset-password/checkOtp',{email:inputField.email,otp:inputField.otp})
        .then((resp) => {
            setOtpValidate(true);
            setContentVal("Change Password");
            toast.success(resp.data.message)
            setLoader(false)

        })
        .catch(err => {
            toast.error("Some Technical issue while validating otp")
            console.log(err)
            setLoader(false)
        })
    }

    const changePassword = async() => {
        setLoader(true)
        await axios.post('http://localhost:4000/auth/reset-password',{email:inputField.email , newPassword : inputField.newPassword})
        .then((resp => {
            toast.success(resp.data.message)
            setLoader(false)
        }))
        .catch(err => {
            toast.error("Some Technical issue while changing password")
            console.log(err)
            setLoader(false)
        })
    }
    const handleOnChange = (event , name) => {
        setInputField({...inputField ,[name] : event.target.value})

    }
  return (
    <div className='w-full'>
        <div className='w-full mb-5'>
            <div>Enter Your Email</div>
            <input type="email" 
            value = {inputField.email}
            onChange={(event) => (handleOnChange(event , "email"))}
            placeholder='Enter email'
            className='w-full p-2 rounded-lg border-2 border-slate-200'/>    
        </div>

        {
            emailSubmit && 
            <div className='w-full mb-5'>
            <div>Enter Your OTP</div>
            <input type="number"
            value = {inputField.otp}
            onChange={(event) => (handleOnChange(event , "otp"))}
            placeholder='Enter OTP'
            className='w-full p-2 rounded-lg border-2 border-slate-200'/>    
        </div>
        }

        {otpValidate && 
        <div className='w-full mb-5'>
            <div>Enter Your New Password</div>
            <input type="password" 
            value = {inputField.newPassword}
            onChange={(event) => (handleOnChange(event , "newPassword"))}
            placeholder='Enter New Password'
            className='w-full p-2 rounded-lg border-2 border-slate-200'/>    
        </div>
        }


        <div className='bg-slate-800 text-white mx-auto w-2/3 rounded-lg p-3 text-center font-semibold cursor-pointer
        border-2 hover:text-black hover:bg-white' onClick={handleSubmit}>{contentVal}</div>
        {loader && <Loader/>}
        <ToastContainer/>
    </div>
  )
}

export default ForgotPass