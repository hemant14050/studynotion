import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {FaArrowLeft} from "react-icons/fa";
import {getPasswordResetToken} from "../services/operations/authAPI";
import Loader from '../components/common/Loader';

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const {loading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  }

  return (
    loading? 
    (<div className='flex min-h-[calc(100vh-4.2rem)] w-11/12 mx-auto justify-center items-center'>
        <Loader/>
    </div>):
    (<div className='flex min-h-[calc(100vh-4.2rem)] w-11/12 max-w-[450px] mx-auto justify-center items-center text-richblack-25'>
        <div className='flex flex-col gap-3'>
          <h1 className='text-richblack-5 font-semibold text-[1.975rem] leading-[2.375rem]'>
            {
              !emailSent? "Reset your password" : "Check your Email"
            }
          </h1>
          <p className='text-richblack-400 text-lg'>
            {
              !emailSent? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery":
              `We have sent the reset email to ${email}`
            }
          </p>
          <form onSubmit={handleOnSubmit}>
            {
              !emailSent && 
              (<div>
                <label htmlFor='email' 
                className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                  Email Address<sup className="text-pink-200"> *</sup>
                </label>
                <input
                  required
                  type='email'
                  name='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your Email Address'
                  className="bg-richblack-800 rounded-[0.5rem] mt-1 text-richblack-5 w-full p-[12px] border-b-[3px] border-b-richblack-700"
                  />
              </div>)
            }

            <button type='submit' 
            className="bg-yellow-50 rounded-[8px] w-full font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
              {
                !emailSent?
                "Reset Password":
                "Resend Email"
              }
            </button>
          </form>
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

export default ForgotPassword;