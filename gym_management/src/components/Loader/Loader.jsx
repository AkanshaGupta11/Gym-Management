import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black/50'>
            <Box sx={{ display: 'flex' }}>
            <CircularProgress size="10rem" sx={{color:"white"}} />
    </Box>
        </div>
    )
}
export default Loader