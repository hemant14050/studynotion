import React from 'react';
import {FaSignOutAlt} from "react-icons/fa";
import {RiDashboard3Fill} from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import {BiSolidDownArrow, BiSolidUpArrow} from "react-icons/bi";
import {logout} from "../../../services/operations/authAPI";
import Catalog from '../../common/Catalog';

const ProfileDropDown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, ()=> setOpen(false));

  if(!user) return null;
  return (
    <div className='w-[30px] h-[30px] rounded-full bg-richblack-25 cursor-pointer group relative mr-4'
    onClick={() => setOpen(true)}
    >
        <img src={user?.image} alt='profileImage' height={30} width={30} className='rounded-full' />
        
        {
        open && 
          <div 
          onClick={(e) => e.stopPropagation()}
          ref={ref}
          className='absolute top-10 right-0 z-10 bg-richblack-900 border border-richblack-600 rounded-lg flex flex-col gap-2 justify-center min-w-[165px]'>
            <Link to={"/dashboard/my-profile"} className='flex text-richblack-25 border-b border-richblack-600 items-center gap-2 p-2'>
              <RiDashboard3Fill size={20} /> 
              <p>Dashboard</p>
            </Link>
            
            <Catalog loading={loading} setLoading={setLoading} />

            <div  
              onClick={() => {
                dispatch(logout(navigate));
              }}
              className='flex text-richblack-25 items-center gap-2 border-richblack-600 pb-2 px-2 cursor-pointer'>
              <FaSignOutAlt size={20} /> 
              <p>Logout</p>
            </div>
          </div>
        }

        {
          open ?
          (<BiSolidUpArrow
            className={"absolute top-[50%] -translate-y-[50%] -right-5 transition-all duration-200"}
           />) :
          (<BiSolidDownArrow
            className={"absolute top-[50%] -translate-y-[50%] -right-5 transition-all duration-200"}
          />)
        }
    </div>
  )
}

export default ProfileDropDown