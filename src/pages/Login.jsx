import React from "react";
import Template from "../components/core/Template";
import loginImage from "../assets/Images/login.webp";

const Login = () => {
  return (
    <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={loginImage}
      formtype="login"
    />
  );
};

export default Login;
