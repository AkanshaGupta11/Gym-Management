import React from 'react'
import { Link } from 'react-router-dom'
function Card({title ,icon , color , path,link}) {

  const handleOnClickMenu =(value) => {
      
        sessionStorage.setItem("func",value.link)
    }
  return (
    <div>
       <Link to={path} 
       onClick={()=>handleOnClickMenu({link})}
       className='block no-underline w-full h-fit border-2 bg-white rounded-lg cursor-pointer'>
            <div className={`h-3 rounded-t-lg bg-gradient-to-r ${color}`}></div>
            <div className='py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white'>
                {React.cloneElement(icon)}
                <p className='text-xl my-3 font-semibold font-mono'>{title}</p>
            </div>

            </Link> 
    </div>
  )
}

export default Card