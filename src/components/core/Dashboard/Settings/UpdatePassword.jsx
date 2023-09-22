import React, {useState} from 'react';
import IconBtn from '../../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {updatePassword} from "../../../../services/operations/settingsAPI.js";


const UpdatePassword = () => {
    const navigate = useNavigate();

    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmNewPass, setShowConfirmNewPass] = useState(false);
    
    const [updatePasswordFormData, setUpdatePasswordFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleChange2 = (e) => {
        setUpdatePasswordFormData({
            ...updatePasswordFormData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit2 = (e) => {
        e.preventDefault();
        if(updatePasswordFormData.newPassword !== updatePasswordFormData.confirmNewPassword) {
            toast.error("New password and confirm new password do not match.");
            return;
        }
        dispatch(updatePassword(token, updatePasswordFormData));
    }

    return (
        <>
            <form 
            onSubmit={handleSubmit2}
            className='w-full'
            >
            <div className='bg-richblack-800 justify-between items-center px-5 py-8 md:px-8 rounded-lg border-[1px] border-richblack-700'>
                <div className='flex justify-between w-full items-center gap-6'>
                    <p
                    className='text-xl text-richblack-5'
                    >Update Password</p>
                </div>

                <div
                className='mt-4 w-full flex flex-col gap-6 text-base'>
                    <div className='flex w-full flex-col lg:flex-row justify-between gap-4'>
                    <div className='lg:w-[50%]'>
                        <label htmlFor='oldPassword' className='relative'>
                            <p className='text-richblack-5'>Old/Current Password</p>
                            <input 
                            value={updatePasswordFormData.oldPassword}
                            onChange={(e)=>{handleChange2(e)}}
                            className='mt-1 p-3 rounded-lg bg-richblack-700 text-richblack-5 border-b w-full outline-0'
                            name='oldPassword'
                            id='oldPassword'
                            type={`${showOldPass? "text": "password"}`}
                            placeholder='Enter old/current password'
                            />

                            <span
                            className="absolute right-3 top-[38px] cursor-pointer"
                            onClick={() => {
                                setShowOldPass(!showOldPass);
                            }}
                            >
                                {showOldPass ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                        </label>
                    </div>
                    </div>

                    <div className='flex w-full flex-col lg:flex-row justify-between gap-4'>
                    <div className='w-full'>
                        <label htmlFor='newPassword' className='relative'>
                            <p className='text-richblack-5'>New Password</p>
                            <input 
                            value={updatePasswordFormData.newPassword}
                            onChange={(e)=>{handleChange2(e)}}
                            className='mt-1 p-3 rounded-lg bg-richblack-700 text-richblack-5 border-b w-full outline-0'
                            name='newPassword'
                            id='newPassword'
                            type={`${showNewPass? "text": "password"}`}
                            placeholder='Enter new password'
                            />

                            <span
                            className="absolute right-3 top-[38px] cursor-pointer"
                            onClick={() => {
                                setShowNewPass(!showNewPass);
                            }}
                            >
                                {showNewPass ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                        </label>
                    </div>

                    <div className='w-full'>
                        <label htmlFor='confirmNewPassword' className='relative'>
                            <p className='text-richblack-5'>Confirm New Password</p>
                            <input
                            value={updatePasswordFormData.confirmNewPassword}
                            onChange={(e)=>{handleChange2(e)}}
                            className='mt-1 p-3 rounded-lg bg-richblack-700 text-richblack-5 border-b w-full outline-0'
                            name='confirmNewPassword'
                            id='confirmNewPassword'
                            type={`${showConfirmNewPass? "text": "password"}`}
                            placeholder='Enter confirm new password'
                            />

                            <span
                            className="absolute right-3 top-[38px] cursor-pointer"
                            onClick={() => {
                                setShowConfirmNewPass(!showConfirmNewPass);
                            }}
                            >
                                {showConfirmNewPass ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                        </label>
                    </div>
                    </div>
                </div>
                
            </div>

            <div className='flex justify-end mt-5 gap-5'>
                <button
                onClick={() => navigate("/dashboard/my-profile")}
                className='px-4 py-2 bg-richblack-700 text-richblack-5 font-bold rounded-lg'
                >
                Cancel 
                </button>
                <IconBtn type={"submit"} text={"Save"}/>
            </div>
            </form>
        </>
    )
}

export default UpdatePassword;