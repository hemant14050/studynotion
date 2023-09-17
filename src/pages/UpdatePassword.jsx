import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from "../components/common/Loader";
import { Link, useParams } from 'react-router-dom';
import {FaArrowLeft} from "react-icons/fa";
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const {token} = params;

    const {loading} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordC, setShowPasswordC] = useState(false);
    const [success, setSuccess] = useState(false);
    const [encodedEmail, setEncodedEmail] = useState(null);
    const [formData, setFormdata] = useState({
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleOnChange = (e) => {
        setFormdata((prevData) => (
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(formData.newPassword !== formData.confirmNewPassword) {
            toast.error("New password and password do not match!");
            return;
        }
        const sendFormData = {
            ...formData,
            token
        }
        dispatch(resetPassword(sendFormData, setSuccess, setEncodedEmail));
    }

    return (
        loading?
        (<div className='flex min-h-[calc(100vh-4.2rem)] w-11/12 mx-auto justify-center items-center'>
            <Loader/>
        </div>):
        (<div className='flex min-h-[calc(100vh-4.2rem)] w-11/12 max-w-[450px] mx-auto justify-center items-center text-richblack-25'>
            <div className='w-full max-w-[450px] flex flex-col gap-3'>
                <h1
                className='text-richblack-5 font-semibold text-[1.975rem] leading-[2.375rem]'
                >
                    {
                        success? 
                        "Reset Complete!":
                        "Choose new Password"
                    }
                </h1>
                <div className='text-richblack-400 text-lg'>
                {
                    success? 
                    `All done! We have updated password for email ${encodedEmail}`:
                    "Almost done. Enter your new password and youre all set."
                }
                </div>
                {!success && <form onSubmit={handleOnSubmit}
                className='flex flex-col gap-2'
                 > 
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='newPassword'
                        className='text-[0.875rem] text-richblack-5 leading-[1.375rem]'
                        >
                            New Password <sup className='text-pink-200'>*</sup>
                        </label>
                        <div className='w-full relative'>
                            <input type={`${showPassword? "text": "password"}`} 
                            name='newPassword' 
                            value={formData.newPassword}
                            onChange={(e)=>{handleOnChange(e)}}
                            id='newPassword' 
                            required
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[3px] border-b-richblack-700'
                             />

                            <span
                                className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer"
                                onClick={() => {
                                    setShowPassword(!showPassword);
                                }}
                                >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor='confirmNewPassword'
                        className='text-[0.875rem] text-richblack-5 leading-[1.375rem]'
                        >
                            Confirm New Password <sup className='text-pink-200'>*</sup>
                        </label>
                        <div className='w-full relative'>
                            <input type={`${showPasswordC? "text": "password"}`}
                            value={formData.confirmNewPassword}
                            onChange={(e)=>{handleOnChange(e)}}
                            name='confirmNewPassword' 
                            id='confirmNewPassword' 
                            required 
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[3px] border-b-richblack-700'    
                            />
                            <span
                                className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer"
                                onClick={() => {
                                    setShowPasswordC(!showPasswordC);
                                }}
                                >
                                {showPasswordC ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                        </div>
                    </div>

                    {/* strength */}
                    {/* <div>
                        
                    </div> */}

                    <button type='submit' 
                    className="bg-yellow-50 rounded-[8px] w-full font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
                    Reset Password
                    </button>
                </form>}

                {
                    success && 
                    <Link to={"/login"} 
                    className="bg-yellow-50 text-center rounded-[8px] w-full font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
                    Return to Login
                    </Link>
                }

                <div className='mt-2'>
                    <Link to={"/login"} className='flex gap-3 items-center'>
                    <FaArrowLeft/>
                    <p>
                    Back to Login
                    </p>
                    </Link>
                </div>
            </div>
        </div>)
    )
}

export default UpdatePassword