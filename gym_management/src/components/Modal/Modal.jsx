import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

function Modal({header , handleClose , content}) {
  return (
    <div className='fixed inset-0 z-[1000] flex justify-center items-center bg-black/50 backdrop-blur-sm'>
        <div className='w-[90%] max-w-md bg-white rounded-2xl shadow-2xl p-6'>
            <div className='flex justify-between items-center border-b pb-4 mb-4'>
              <div className='text-xl font-bold'>{header}</div>
              <div onClick={() => handleClose()}><CloseIcon sx={{fontSize:"32px"}}/></div>

            </div>
            <div className='mt-10'>
              {content}
            </div>
        </div>
    </div>
  )
}

export default Modal