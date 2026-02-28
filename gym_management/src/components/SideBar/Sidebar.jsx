import React, { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Sidebar() {
    const [greeting , setGreeting] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect (() => {

        const greetingMessage = () => {
        //curr hour 
        const currHour = new Date().getHours();

        if(currHour < 12){
            setGreeting("Good Morning");
        }

        else if(currHour < 18){
            setGreeting("Good Afternoon");
        }

        else if(currHour < 21){
            setGreeting("Good Evening");
        }

        else{
            setGreeting("Good Night");
        }


        }
        greetingMessage()
    },[])


    const handleLogout = async() => {
        localStorage.clear();
        navigate("/");

    }
  return (
    <div className='h-[100vh] w-1/4 border-2 bg-slate-900 text-white p-5'>
        <div className='text-center font-extralight text-3xl'>
            {localStorage.getItem('gymName')}

        </div>
        <div className='flex gap-5 my-5'>
            <div className='w-[100px] h-[100px] rounded-lg' >
                <img src= {localStorage.getItem('gymPic')} alt="" className='w-full h-full rounded-lg-full'/>
            </div>
            <div>
                <div className='text-2xl'>{greeting}</div>
                <div className='text-xl mt-1 font-semibold'>admin</div>
            </div>
        </div>

        <div className='mt-10 py-5 border-t-2 border-gray-700'>
            <Link to={"/dashboard"} className={`items-center rounded-xl p-3 flex gap-7 font-semibold text-xl bg-slate-800 cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black
                ${location.pathname === "/dashboard" ?'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-2 ':'null' }`}>
                <div><HomeIcon/></div>
                <div>Dashboard</div>
            </Link>

            

            <Link to={"/member"} className={`items-center mt-5 rounded-xl p-3 flex gap-7 font-semibold text-xl bg-slate-800 cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black
                ${location.pathname === "/member" ?'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-2 ':'null'}`}>
                <div><GroupIcon/></div>
                <div>Members</div>
            </Link>

            <div 
            onClick={() => (handleLogout())}
            className='items-center mt-5 rounded-xl p-3 flex gap-7 font-semibold text-xl bg-slate-800 cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'>
                <div><LogoutIcon/></div>
                <div>Logout</div>
            </div>

            
        </div>
    </div>
  )
}

export default Sidebar