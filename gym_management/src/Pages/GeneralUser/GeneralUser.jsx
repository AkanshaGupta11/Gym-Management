import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MemberCard from '../../components/Common/MemberCard';
import { getMonthlyJoined , threeDayExpire,fourToSevenDayExpire, expiredMembers,inActiveMembers } from './Data'; 
import { ToastContainer,toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

function GeneralUser() {
    const [header, setHeader] = useState("");
    const [data , setData] = useState([]);
    const {page} = useParams();

    useEffect(() => {
        const func= localStorage.getItem('func');
        const functionCall = async(func) => {
        setHeader(func);
        }
        functionCall(func);
    },[])

    const pageConfig = {
        "monthly": {
            title: "Monthly Joined Members",
            fetchFunction: getMonthlyJoined
        },
        "expires-within-3-days": {
            title: "Expiring In 3 Days",
            fetchFunction: threeDayExpire
        },
        "expires-within-4-7-days": {
            title: "Expiring In 4-7 Days",
            fetchFunction: fourToSevenDayExpire
        },
        "expired": {
            title: "Expired Members",
            fetchFunction: expiredMembers
        },
        "inactive-members": {
            title: "Inactive Members",
            fetchFunction: inActiveMembers
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            // 2. Get the config for the current page
            const config = pageConfig[page];
            console.log("config",config);
            console.log(config.fetchFunction.name)
            if (config) {
                setHeader(config.title);
                console.log(config.title);
                console.log(config.fetchFunction)
                const fun = config.fetchFunction;
                const responseData = await fun();
                console.log("responsedt:",responseData);
                if(responseData.members.length == 0){
                    toast.error("No such Members Found")
                    
                }
                if (responseData && responseData.members) {
                    setData(responseData.members);
                }
            }
        };

        fetchData();
    }, [page]);
    
  return (
    <div className='text-black p-5 w-3/4 flex-col'>
        <div className='border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3'>
            <Link to={"/dashboard"} className='border-2pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'>
                <ArrowBackIcon/> Back To Dashboard
            </Link>

        </div>

        <div className='mt-5 text-xl text-slate-900'>
            {header}
        </div>

        <div className='bg-slate-100 p-5 mt-5 rounded-lg grid  gap-2 grid:cols-3 overflow-x-auto h-[80%]'>
            {
                data.map((item,index) => (
                    <MemberCard item = {item}/>
                ))
            }
        </div>
        <ToastContainer/>
    </div>
  )
}

export default GeneralUser