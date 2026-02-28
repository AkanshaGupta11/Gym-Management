import React, { useState } from 'react'
import Modal from '../Modal/Modal'
import axios from 'axios'
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { toast , ToastContainer } from 'react-toastify';

function Signup({openModal}) {
  const [inputField , setInputField] = useState({gymName:"" , email:"", userName:"" , password:"", profilePic:"https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg"})
  const [loaderImg , setLoaderImg] = useState(false)

  const initialFormState = {
  gymName: "",
  email: "",
  userName: "",
  password: "",
  profilePic: "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg"
};

  const handleOnChange = (event , name) => {
    
    setInputField({...inputField,[name]:event.target.value})
  }

  const uploadImage = async(event) => {
    setLoaderImg(true);
    const file =event.target.files;
    const data = new FormData();

    data.append('file',file[0])

    data.append('upload_preset' , 'gym_management');

    try{
      const res = await axios.post("https://api.cloudinary.com/v1_1/dfq1kua59/image/upload" , data);
      const imgurl = res.data.url;
      setInputField({...inputField , ['profilePic'] : imgurl})
      setLoaderImg(false);
    }
    catch(err){
      console.log("image Uploading");
      console.log(err);
      setLoaderImg(false);
    } 

  }


  const handleRegister = async() => {
    await axios.post('http://localhost:4000/auth/register',inputField)
    .then((resp) => {
      const mssg = resp?.data?.message
      toast.success(mssg)
      setInputField(initialFormState);
    })
    .catch(err => {
      //const errMssg = err.response.data.error
      toast.error(err.response?.data?.message)
      setInputField(initialFormState);
    })
  }
  return (
    <div className='w-full lg:w-[450px] h-[500px] flex flex-col items-center bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-2xl shadow-xl overflow-y-auto '>
        <div className='text-3xl text-white font-light mb-8'>Register Your Gym</div>
        <input type="email" 
        value = {inputField.email}
        onChange={(event) => (handleOnChange(event,"email" ))}
        className='w-full mb-4 p-3 rounded-lg bg-white outline-none' placeholder='Enter Email'/>
        
        <input type="text" 
        value={inputField.gymName}
        onChange={(event) => (handleOnChange(event,"gymName" ))}
        className='w-full mb-4 p-3 rounded-lg bg-white outline-none' placeholder='Enter Gym Name'/>
        
        <input type="text" 
        value= {inputField.userName}
        onChange={(event) => (handleOnChange(event,"userName" ))}
        className='w-full mb-4 p-3 rounded-lg bg-white outline-none' placeholder='Enter UserName' />
        
        <input type="password" 
        value = {inputField.password}
        onChange={(event) => (handleOnChange(event,"password" ))}
        className='w-full mb-4 p-3 rounded-lg bg-white outline-none' placeholder='Enter Password' />
        
        <label className='text-white self-start mb-2 ml-1'>Gym Photo:</label>
        
        <input type="file" 
        onChange={(e) => uploadImage(e)}
        className='w-full mb-10 p-2 rounded-lg text-white' />

        {
          loaderImg && 
          <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
            <LinearProgress color="secondary" />
        </Stack>
        }
        <img src={inputField.profilePic} className='mb-10 h-[200px] w-[250px]' alt="" />
        
        <button className='p-3 w-full bg-slate-800 text-white rounded-lg text-lg hover:bg-white hover:text-black font-semibold mb-4'
        onClick={handleRegister}>
            Register
        </button>
        <button className='text-white hover:underline text-sm'
        onClick={openModal}>Forgot Password?</button>

        <ToastContainer/>
    </div>
  )
}

export default Signup