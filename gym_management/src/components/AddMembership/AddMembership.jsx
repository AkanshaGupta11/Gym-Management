import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify'


function AddMembership({handleClose}) {
    const[inputField , setInputField] = useState({months:"" , price:""})
    const [membership , setMembership] = useState([]);
    const handleOnChange = (event , name) => {
        setInputField({...inputField , [name] : event.target.value})
    }
    
    const fetchMembership = async() => {
        await axios.get('http://localhost:4000/plans/get-membership',{withCredentials:true})
        .then((resp) => {
            console.log(resp)
            setMembership(resp?.data?.membership)
         })
        .catch(err => {
            toast.error("Failed to Fetch Memberships")
            console.log(err);
        })
    }
    useEffect(() => {
        fetchMembership()
    },[])

    const handleAddMembership = async() => {
        await axios.post('http://localhost:4000/plans/add-membership' ,inputField ,{withCredentials:true} )
        .then((resp) => {
            console.log(resp)
            toast.success(resp?.data?.message)
            handleClose();
        })
        .catch(err => {
            toast.error("Failed to add Memberships")
            console.log(err);
        })
    }
  return (
    <div className='text-black'>
        <div className='flex flex-wrap gap-5 items-center justify-center'>
            {/* block for membership  */}
            {
                membership.map((item,index) => {
                    return(
                        <div className='text-lg bg-slate-900 text-white border-2 pl-2 pr-2 flex-col gap-3 justify-between pt-1 pb-1 rounded-xl font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                        <div>{item.months} Months Membership</div>
                        <div>Rs.{item.price}</div>

            </div>
                    )
                })
            }
        </div>

        <hr className='mt-10 mb-10'/>
        <div className='flex gap-10 mb-10'>
            <input type="number" 
            value = {inputField.months}
            onChange={(event) => handleOnChange(event,"months")}
            placeholder='Add No of Months'
            className='border-2 rounded-lg text-lg w-1/3 h-1/2 p-2'/>

            <input type="number"
            value = {inputField.price}
            onChange={(event) => handleOnChange(event,"price")}
            className='border-2 rounded-lg text-lg w-1/3 h-1/2 p-2'
            placeholder='Add Price' />

            <div className='text-lg border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 '
            onClick={handleAddMembership}>
                Add +
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default AddMembership