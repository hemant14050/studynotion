import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../../services/operations/authAPI";

const LoginForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);

  const formChangeHandler = (e) => {
    // const [name, value] = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));  
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password) {
      toast.error("All fields are required!");
      return;
    }
    dispatch(login(formData, navigate));
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col gap-y-4 mt-6">
      <label className="w-full">
        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
          Email Address<sup className="text-pink-200"> *</sup>
        </p>
        <input
          required
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={formChangeHandler}
          placeholder="Enter your Email"
          className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[3px] border-b-richblack-700"
        />
      </label>

      <label className="w-full relative">
        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
          Password<sup className="text-pink-200"> *</sup>
        </p>
        <input
          required
          placeholder="Enter your Password"
          type={showPass ? "text" : "password"}
          name="password"
          id="password"
          onChange={formChangeHandler}
          value={formData.password}
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

      <Link to={"/forgot-password"} className="text-blue-100 max-w-full ml-auto right-0 text-s">
        Forgot Password?
      </Link>

      <button className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
