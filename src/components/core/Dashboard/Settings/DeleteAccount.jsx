import React from 'react';
import {RiDeleteBin6Fill} from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../../../../services/operations/settingsAPI';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);

    return (
        <>
            <div className='bg-pink-900 flex items-center px-5 py-8 md:px-8 rounded-lg border-[1px] border-pink-600'>
            
            <div className='flex gap-7'>
                <div className='text-pink-700 flex justify-center items-center w-[60px] h-[60px] rounded-full bg-pink-300 p-3'>
                <RiDeleteBin6Fill size={60} />
                </div>
                <div className='flex flex-col gap-2 text-richblack-100 font-medium'>
                <div className='text-richblack-5 text-xl font-bold'>
                Delete Account
                </div>
                <div>
                    <p>Would you like to delete account?</p>
                    <p>This account may contain Paid Courses. Deleting your account is</p>
                    <p>permanent and will remove all the contain associated with it.</p>
                </div>

                <div className='text-pink-400 cursor-pointer'
                onClick={() => {dispatch(deleteAccount(token, navigate))}}
                >
                    I want to delete my account.
                </div>
                </div>
            </div>
                
        </div>
        </>
    )
}

export default DeleteAccount;