import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Home/home'
import {Routes , Route, useNavigate} from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard'
import Sidebar from './components/SideBar/Sidebar'
import {useEffect } from 'react'
import Member from './Pages/Member/Member'
import GeneralUser from './Pages/GeneralUser/GeneralUser'
import MemberDetail from './Pages/MemberDetail/MemberDetail'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const navigate = useNavigate();
  const [isLogin , setisLogin] = useState(false);
  useEffect (() => {
    let isLoggedin = localStorage.getItem("isLogin");
    if(isLoggedin){
      setisLogin(true);
      //navigate("/dashboard");
    }
    else{
      //if user not loggen in tho hi hom epage 
      setisLogin(false); 
      navigate("/");
    }
  },[localStorage.getItem("isLogin")])
  return (
    <>
      <div className='flex' >
        {
          isLogin && <Sidebar />
        }
        
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/dashboard" element = {<Dashboard/>}/>
          <Route path="/member" element = {<Member/>}/>
          <Route path ="/specific/:page" element ={<GeneralUser/>}/>
          <Route path = "/member/:id" element = {<MemberDetail/>}/>
        </Routes>
        
      </div>
    </>
  )
}

export default App
