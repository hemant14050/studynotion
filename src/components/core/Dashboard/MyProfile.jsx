import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import {BiEdit} from "react-icons/bi";

const MyProfile = () => {
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <>
            <h1
            className='text-richblack-5 text-4xl mb-10'
            >My Profile</h1>
            <div className='flex flex-col gap-10'>
                <div className='bg-richblack-800 flex justify-between items-center px-5 py-10 rounded-lg border-[1px] border-richblack-700 relative'>
                    <div className='flex items-center gap-6'>
                        <img src={user?.image} alt={`profile-${user?.firstName}`}
                        width={78}
                        height={78}
                        className='rounded-full'
                        />
                        <div>
                            <p
                            className='text-richblack-5 text-xl font-bold'
                            > {user?.firstName + " " + user?.lastName} </p>
                            <p> {user?.email} </p>
                        </div>
                    </div>
                    
                    <div className='absolute right-2 top-2 md:relative'>
                        <IconBtn
                        text={"Edit"}
                        onClick={() => {
                            navigate("/dashboard/settings")
                        }}
                        >
                        <BiEdit/>
                        </IconBtn>
                    </div>
                </div>

                <div className='bg-richblack-800 justify-between items-center px-5 py-10 relative rounded-lg border-[1px] border-richblack-700'>
                    <div className='flex justify-between w-full items-center gap-6'>
                        <p
                        className='text-xl text-richblack-5'
                        >About</p>

                        <div className='absolute right-2 top-2 md:relative'>
                            <IconBtn
                            text={"Edit"}
                            onClick={() => {
                                navigate("/dashboard/settings")
                            }}
                            >
                            <BiEdit/>
                            </IconBtn>
                        </div>
                    </div>

                    <div className='mt-4'>
                        {
                            user?.additionalDetailes?.about || "Write something about yourself"
                        }
                    </div>
                    
                </div>

                <div className='bg-richblack-800 justify-between items-center px-5 py-10 relative rounded-lg border-[1px] border-richblack-700'>
                    <div className='flex justify-between w-full items-center gap-6'>
                        <p
                        className='text-xl text-richblack-5'
                        >Personal Details</p>

                        <div className='absolute right-2 top-2 md:relative'>
                            <IconBtn
                            text={"Edit"}
                            onClick={() => {
                                navigate("/dashboard/settings")
                            }}
                            >
                            <BiEdit/>
                            </IconBtn>
                        </div>
                    </div>

                    <div className='mt-4 flex flex-col md:flex-row gap-5 justify-between max-w-[450px] text-base'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col'>
                                <p>First Name</p>
                                <p className='text-richblack-5'>{user?.firstName}</p>
                            </div>

                            <div className='flex flex-col'>
                                <p>Email</p>
                                <p className='text-richblack-5'>{user?.email}</p>
                            </div>

                            <div className='flex flex-col'>
                                <p>Gender</p>
                                <p className='text-richblack-5'>{user?.additionalDetailes?.gender || "-"}</p>
                            </div>
                        </div>
                        <div>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col'>
                                    <p>Last Name</p>
                                    <p className='text-richblack-5'>{user?.lastName}</p>
                                </div>

                                <div className='flex flex-col'>
                                    <p>Phone Number</p>
                                    <p className='text-richblack-5'>{user?.additionalDetailes.contactNumber || "-"}</p>
                                </div>

                                <div className='flex flex-col'>
                                    <p>Date of Birth</p>
                                    <p className='text-richblack-5'>{user?.additionalDetailes?.dateOfBirth || "-"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default MyProfile