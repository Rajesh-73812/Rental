import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const CourseHeader = () => {
    const navigate = useNavigate();

    // navigation 
    const navigateToCourse = () => {
        navigate('/create-course')
    }
    return (
        <div className="bg-[#f7fbff] p-6 w-[1000px]">
            <div className=" flex items-center justify-between h-9" >
                <div className=" text-xl sm:text-2xl w-16 h-9 text-[#131313]  leading-9 font-semibold whitespace-nowrap" style={{  fontFamily: 'Montserrat'}}>
                    Course List
                </div>
                <div className=' flex items-center gap-3'>
                    <div className="hidden sm:flex  items-center border border-input rounded-lg bg-white shadow-sm top-[104px] h-9 opacity-100 " style={{  border: '1px solid #EAE5FF', boxShadow: '0px 0px 1px 1px #00000033' }}>
                        <input type="search" placeholder="Search" className="outline-none text-sm placeholder-gray-600 px-3 py-2 rounded-l-lg h-9 w-[300px]" style={{ fontFamily: 'Montserrat', borderRadius: '8px 0 0 8px' }} />
                        <img src="/image/action/search-normal.svg" alt="Search" className="w-9 h-5 text-[#131313] " />
                    </div>
                    <div className=" text-left flex gap-3">

                        <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-9" type="button" onClick={navigateToCourse} > <AddRoundedIcon  className='font-[18px] mt-[2px]'/> Create Course </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseHeader;