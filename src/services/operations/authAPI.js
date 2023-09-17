import {toast} from "react-hot-toast";

import { authEndpoints } from "../apis";
import {setLoading, setToken} from "../../store/slices/authSlice";
import {setUser} from "../../store/slices/profileSlice";
import {apiConnector} from "../apiConnector";

const {
    LOGIN_API,
    SIGNUP_API,
    SENDOTP_API,
    RESETPASSTOKEN_API,
    RESETPASS_API,
} = authEndpoints;

export const sendotp = (email, navigate) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API, {email});
            console.log("SENTOTP LOGS...");
            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("OTP sent to email, Please check your email")
            navigate("/verify-email");

        } catch(err) {
            if(err.response) {
                toast.error(err.response.data.message);
            } else {
                console.log("OPT SEND ERROR LOGS...", err);
                toast.error("OTP not sent, Error while sending otp");
            }
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}
 
export const signup = ({
        firstName, 
        lastName, 
        password, 
        confirmPassword, 
        email, 
        accountType,
        otp
    }, navigate) => {

    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName, 
                lastName, 
                password, 
                confirmPassword, 
                email, 
                accountType,
                otp
            });
            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("User Registered successfully!");
            navigate("/login");
        } catch(err) {
            if(err.response) {
                toast.error(err.response.data?.message);
            } else {
                console.log("SIGNUP ERROR LOGS...", err);
                toast.error("Signup failed!");
            }
        }
        
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
   
}

export const login = ({
        email, 
        password
    }, navigate) => {

    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, {email, password});
            console.log("LOGIN RESPONSE LOGS...");

            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            
            dispatch(setToken(response?.data?.token));
            dispatch(setUser(response?.data?.user));
            toast.success("Login successful!");

            navigate("/dashboard/my-profile");

        } catch(err) {
            if(err.response) {
                toast.error(err.response.data?.message);
            } else {
                console.log("LOGIN ERROR LOGS...", err);
                toast.error("Login failed!");
            }
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export const getPasswordResetToken = (email, setEmailSent) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {email,});
            console.log("RESETPASSWORD RESPONSE LOGS...");

            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Reset Email Sent");
            setEmailSent(true);
        } catch(err) {
            if(err.response) {
                toast.error(err.response.data?.message);
            } else {
                console.log("RESET PASSWORD TOKEN ERROR LOGS...", err);
                toast.error("Failed to send Email!");
            }
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const resetPassword = ({newPassword, confirmNewPassword, token,}, setSuccess, setEncodedEmail) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASS_API, {newPassword, confirmNewPassword, token});
            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            setEncodedEmail(response.data.encodedEmail);
            setSuccess(true);
            toast.success("Password updated successfully!");
        } catch(err) {
            if(err.response) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Password not updated, try again!");
            }
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}