import React from 'react';
import {FaSignOutAlt} from "react-icons/fa";
import {RiDashboard3Fill} from "react-icons/ri";
import { Link } from 'react-router-dom';

const ProfileDropDown = ({user}) => {
  return (
    <div className='w-[30px] h-[30px] rounded-full bg-richblack-25 cursor-pointer group relative'>
        <img src={user.image} alt='profileImage' height={30} width={30} className='rounded-full' />

        <div className='invisible opacity-0 absolute top-10 right-0 z-10 bg-richblack-900 border border-richblack-600 rounded-lg flex flex-col gap-2 justify-center w-[130px]'>
          <Link to={"/dashboard"} className='flex text-richblack-25 border-b border-richblack-600 items-center gap-2 p-2'>
            <RiDashboard3Fill size={20} /> 
            <p>Dashboard</p>
          </Link>

          <Link to={"/logout"} className='flex text-richblack-25 items-center gap-2 border-richblack-600 pb-2 px-2'>
            <FaSignOutAlt size={20} /> 
            <p>Logout</p>
          </Link>
        </div>
    </div>
  )
}

export default ProfileDropDown