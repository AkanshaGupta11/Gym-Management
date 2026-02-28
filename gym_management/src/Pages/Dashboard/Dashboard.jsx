import React, { useState , useEffect,useRef } from 'react'
import Sidebar from '../../components/SideBar/Sidebar'
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ErrorIcon from '@mui/icons-material/Error';
import ReportIcon from '@mui/icons-material/Report';
import Card from '../../components/Common/card';

function Dashboard() {
    const [menu , setMenu] = useState(false);
    const ref = useRef();

    const cardData = [
  { id: 1, title: "Joined Members", icon: <GroupIcon sx={{color:"green",fontSize:"50px"}} />, color: "from-blue-500 to-cyan-400" ,path :"/member"},
  { id: 2, title: "Monthly Joined", icon: <SignalCellularAltIcon sx={{color:"purple",fontSize:"50px"}}/>, color: "from-green-500 to-emerald-400", path: "/specific/monthly" , link:"Monthly Joined Members"},
  { id: 3, title: "Expiring within 3 days", icon: <AccessAlarmIcon sx={{color:"red",fontSize:"50px"}}/>, color: "from-purple-500 to-pink-400" , path:"/specific/expires-within-3-days", link:"Expiring In 3 Days Members"},
  { id: 4, title: "Expiring within 4-7 days", icon: <AccessAlarmIcon sx={{color:"red",fontSize:"50px"}}/>, color: "from-orange-500 to-yellow-400", path:"/specific/expires-within-4-7-days"  ,link:"Expiring In 4-7 Days Members"},
  { id: 5, title: "Expired", icon: <ErrorIcon sx={{color:"red",fontSize:"50px"}} />, color: "from-red-500 to-rose-400" , path:"/specific/expired" , link :"Expired Members" },
  { id: 6, title: "InActive Members", icon: <ReportIcon sx={{color:"brown",fontSize:"50px"}}/>, color: "from-slate-600 to-slate-400" , path:"/specific/inactive-members" ,link :"InActive Members"},
];

    useEffect(()=>{
        const checkIfClickedOutside = e =>{
            if(menu && ref.current && !ref.current.contains(e.target)){
                setMenu(false);
            }
        }
        document.addEventListener("mousedown",checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown",checkIfClickedOutside)
        }
    },[menu])

    //5 pages direct to general user page --> how will know konse waale urlse aaye ho 
    //session mai store kro 
    
  return (
    <div className='w-3/4 text-lack p-5 relative'>
        <div className='w-full bg-slate-900 text-white rounded-lg flex p-3 justify-between items-center'>
            <MenuIcon sx={{cursor:"pointer"}} onClick ={() => (setMenu(prev => !prev))}/>
            
            <img src="" alt="logo" className='w-8 h-8 rounded-3xl border-2' />
            
        </div>

        {menu && 
        <div ref = {ref} className='absolute p-3 bg-slate-900 text-white rounded-xl text-lg font-extralight'>
            <div>Hi Welcome to Our Gym Management System</div>
            <p>Feel free to ask any queries</p>
        </div>
        }

        <div className='mt-5 pt-3 bg-slate-100/50 grid gap-5 grid-cols-3 w-full pb-5 overflow-x-auto h-[80%]'>
            {
                cardData.map((items) => (
                    <Card
                    title = {items.title}
                    icon = {items.icon}
                    color = {items.color}
                    path = {items.path}
                    link = {items.link}/>
                ))
            }
        </div>

        <div className='md-bottom-4 p-4 w-3/4 mb-4 md:mb-0 absolute bg-black text-white mt-20 rounded-xl text-xl'>
        Contact Developer for any Technical Error at +9100000000
        </div>
        
    </div>
  )
}

export default Dashboard