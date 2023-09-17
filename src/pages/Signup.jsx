import React from "react";
import Template from "../components/core/Template";
import signupImage from "../assets/Images/signup.webp";
import {useSelector} from "react-redux";
import Loader from "../components/common/Loader";

const Signup = () => {
  const {loading} = useSelector((state) => state.auth);

  return (
    loading?
    (<Loader/>):
    (<Template
      title="Join the millions learning to code with StudyNotion for free"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={signupImage}
      formtype="signup"
    />)
  );
};

export default Signup;
