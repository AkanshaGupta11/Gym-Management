import React, { useState } from 'react'
import axios from 'axios'
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect } from 'react';
import { ToastContainer,toast } from 'react-toastify';

function AddNewMember() {

  const[inputField , setInputField] = useState({name:"" , mobileNo:"",address:"" , membership:"", 
    profilePic :"https://www.pngmart.com/files/23/Profile-PNG-Photo.png" , joiningDate:""})

    const[membershipList , setMembershipList] = useState([])
    const [selectedOption , setSelectedOption] = useState("")
  const [imgLoader , setImgLoader] = useState(false);
  const handleOnChange = (event, name) => {
    setInputField({...inputField,[name]:event.target.value})

  }

   const uploadImage = async(event) => {
    setImgLoader(true);
    const file =event.target.files;
    const data = new FormData();

    data.append('file',file[0])

    data.append('upload_preset' , 'gym_management');

    try{
      const res = await axios.post("https://api.cloudinary.com/v1_1/dfq1kua59/image/upload" , data);
      const imgurl = res.data.url;
      setInputField({...inputField , ['profilePic'] : imgurl})
      setImgLoader(false);
    }
    catch(err){
      console.log("image Uploading");
      console.log(err);
      setImgLoader(false);
    } 

  }

  const fetchMembership = async() => {
    await axios.get('http://localhost:4000/plans/get-membership',{withCredentials : true})
    .then((resp) => {
      setMembershipList(resp?.data?.membership);
      console.log(resp)
      if(resp?.data?.membership.length === 0){
        return toast.error("No Membership added yet"),{
          classNmae:"text-lg"
        }
      }

      else{
        let a = resp.data.membership[0]._id;
        setSelectedOption(a);
        setInputField({...inputField , membership:a})
      }

    })
    .catch(err => {
      console.log(err);
      toast.error("Failed to fetch Members")
    })
  }

  const handleRegisterButton = async() => {
    await axios.post('http://localhost:4000/members/register-member',inputField , {withCredentials:true})
    .then((res) => {
      toast.success("Member Added Successfully")
      setTimeout(() => {
        window.location.reload()
      },2000)
      console.log(res)
    })
    .catch(err => {
      console.log(err);
      toast.error("Failed to register Member")
    })
  }

  useEffect(() =>{
    fetchMembership();
  },[])

  const handleOnChangeSelect = (event) => {
    let val = event.target.value;
    setSelectedOption(val)
  }

  
  return (
    <div className='text-black'>
        <div className='grid grid-cols-2 gap-5 text-lg'>
            <input type="text"
            value={inputField.name}
            onChange={(event) => handleOnChange(event,"name")}
            placeholder='Name of the Joinee'
            className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />

            <input type="number"
            value = {inputField.mobileNo}
            onChange={(event) => handleOnChange(event,"mobileNo")}
            placeholder='Mobile Number'
            className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />
            
            <input type="text"
            value={inputField.address}
            onChange={(event) => handleOnChange(event,"address")}
            placeholder='Enter Address'
            className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />

            <input type="date"
            value={inputField.joiningDate}
            onChange={(event) => handleOnChange(event,"joiningDate")}
            className='border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12' />

            <select name="" id="" value = {selectedOption}
            onChange={handleOnChangeSelect}
             className='border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray'>
                {
                  membershipList.map((item,index) => {
                    return (
                      <option key ={index} value = {item._id}>{item.months} Months Membership</option>
                    )
                  })
                }
            </select>

            <input type="file"
            onChange={(e) => uploadImage(e)} />

            

            <div className='w-[100px] h-[100px]'>
            <img src={inputField.profilePic} alt="" 
            className='w-full h-full rounded-full'/>
            {
              imgLoader && 
              <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="secondary" />
              </Stack>
            }
            </div>

            <div className='p-3 border-2 w-28 text-lg h-14 text-center  bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 '
            onClick={() => handleRegisterButton()}>Register</div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default AddNewMember