import { React, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {setSignupData} from "../../../store/slices/authSlice";
import { sendotp } from "../../../services/operations/authAPI";

const SignupForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [accountType, setAccountType] = useState("Student");

  const formChangeHandler = (e) => {
    // const [name, value] = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const [showPass, setShowPass] = useState(false);
  const [showPassC, setShowPassC] = useState(false);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    };

    dispatch(setSignupData(signupData));
    dispatch(sendotp(signupData.email, navigate));
    
    // console.log("final data:");
    // console.log(signupData);

  };

  return (
    <div>
      {/* student - instructor tab */}
      <div className="flex mt-6 bg-richblack-800 rounded-full text-richblack-200 max-w-max gap-x-1 my-6 p-1 border-b-[2px] border-b-richblack-700">
        <button
          onClick={() => {
            setAccountType("Student");
          }}
          className={`${
            accountType === "Student"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200`}
        >
          Student
        </button>
        <button
          onClick={() => {
            setAccountType("Instructor");
          }}
          className={`${
            accountType === "Instructor"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all duration-200`}
        >
          Instructor
        </button>
      </div>

      <form onSubmit={submitHandler} className="flex flex-col gap-y-4 mt-6">
        <div className="flex gap-x-4">
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              First Name<sup className="text-pink-200">*</sup>
            </p>

            <input
              required
              type="text"
              name="firstName"
              id="firstName"
              onChange={formChangeHandler}
              value={formData.firstName}
              placeholder="Enter first name"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[3px] border-b-richblack-700"
            />
          </label>

          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Last Name<sup className="text-pink-200">*</sup>
            </p>

            <input
              required
              type="text"
              name="lastName"
              id="lastName"
              onChange={formChangeHandler}
              value={formData.lastName}
              placeholder="Enter last name"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[3px] border-b-richblack-700"
            />
          </label>
        </div>

        <label className="w-full">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Email Address<sup className="text-pink-200">*</sup>
          </p>

          <input
            required
            type="email"
            name="email"
            id="email"
            onChange={formChangeHandler}
            value={formData.email}
            placeholder="Enter your Email"
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[3px] border-b-richblack-700"
          />
        </label>

        {/* create password and confirm password */}

        <div className="flex gap-4">
          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Create Password<sup className="text-pink-200">*</sup>
            </p>

            <input
              required
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              onChange={formChangeHandler}
              value={formData.password}
              placeholder="Enter Password"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[3px] border-b-richblack-700"
            />

            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              {showPass ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Confirm Password<sup className="text-pink-200">*</sup>
            </p>

            <input
              required
              type={showPassC ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              onChange={formChangeHandler}
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[3px] border-b-richblack-700"
            />

            <span
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => {
                setShowPassC(!showPassC);
              }}
            >
              {showPassC ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>

        <button className="w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
