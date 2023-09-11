import React from "react";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";
import frameImage from "../../assets/Images/frame.png";
import { FcGoogle } from "react-icons/fc";

function Template({ title, desc1, desc2, image, formtype }) {
  return (
    <div className="flex w-11/12 max-w-maxContent mx-auto items-center md:justify-between pt-10 gap-10 flex-col-reverse md:flex-row">
      {/* left part */}
      <div className="w-full md:w-[450px]">
        <h1 className="text-richblack-5 font-semibold text-[1.975rem] leading-[2.375rem]">
          {title}
        </h1>
        <p className="text-[1.25rem] leading-[1.625rem] mt-4">
          <span className="text-richblack-100">{desc1}</span>
          <br />
          <span className="text-blue-100 italic">{desc2}</span>
        </p>

        {formtype === "signup" ? <SignupForm /> : <LoginForm />}

        <div className="flex flex-row w-full items-center my-4 gap-x-2">
          {/* line */}
          <div className="h-[1px] w-full bg-richblack-700"></div>
          <p className="text-richblack-200">OR</p>
          {/* line */}
          <div className="h-[1px] w-full bg-richblack-700"></div>
        </div>

        <button className="w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100 border border-richblack-700 px-[12px] py-[8px] gap-x-2 my-6">
          <FcGoogle />
          Sign Up with Google
        </button>
      </div>

      {/* right part */}
      <div className="w-full relative md:w-[450px]">
        <img
          src={frameImage}
          alt="pattern"
          width={558}
          height={504}
          loading="lazy"
          className="rounded-[8px]"
        />

        <img
          src={image}
          alt="pattern"
          width={558}
          height={504}
          loading="lazy"
          className="rounded-[8px] absolute -top-4 -left-4"
        />
      </div>
    </div>
  );
}

export default Template;
