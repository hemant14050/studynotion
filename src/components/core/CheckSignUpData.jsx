import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const CheckSignUpData = ({children}) => {
    const {signupData} = useSelector((state)=> state.auth);
    if(signupData) {
        return children;
    } else {
        return <Navigate to="/signup" />;
    }
}

export default CheckSignUpData;