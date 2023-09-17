import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {FaArrowLeft} from "react-icons/fa";
import Loader from '../components/common/Loader';
import {RxCountdownTimer} from "react-icons/rx";
import OtpInput from 'react-otp-input';
import { signup, sendotp } from '../services/operations/authAPI';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const {signupData, loading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const signUpDataOTP = {
      ...signupData,
      otp
    }
    // console.log(signUpDataOTP);
    dispatch(signup(signUpDataOTP, navigate));
  }

  useEffect(() => {
    if(!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  return (
    loading? 
    (<div className='flex min-h-[calc(100vh-4.2rem)] w-11/12 mx-auto justify-center items-center'>
        <Loader/>
    </div>):
    (<div className='flex min-h-[calc(100vh-4.2rem)] w-11/12 max-w-[450px] mx-auto justify-center items-center text-richblack-25'>
        <div className='flex flex-col gap-3'>
          <h1 className='text-richblack-5 font-semibold text-[1.975rem] leading-[2.375rem]'>
            Verify Email
          </h1>
          <p className='text-richblack-400 text-lg'>
          A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleOnSubmit}>
            
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    required
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                  />
                )}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "0 6px",
                }}
              />

            <button type='submit' 
            className="bg-yellow-50 rounded-[8px] w-full font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
              Verify and Register
            </button>
          </form>
          <div className='mt-2 flex justify-between items-center'>
            <Link to={"/signup"} className='flex gap-3 items-center'>
              <FaArrowLeft/>
              <p>
              Back to Signup
              </p>
            </Link>

            <button className='text-base flex items-center gap-1 text-blue-200 cursor-pointer'
            onClick={()=>{dispatch(sendotp(signupData.email, navigate))}}
            >
                <RxCountdownTimer />
                <p>Resend it</p>
            </button>
          </div>
        </div>
    </div>)
  )
}

export default VerifyEmail;