import {toast} from "react-hot-toast";
import { setLoading } from "../../store/slices/authSlice";
import { setUser } from "../../store/slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis"

const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA_API,
} = profileEndpoints;

export const getUserDetails = async(token, navigate) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
                Authorization: `Bearer ${token}`,
            });

            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch(setUser({ 
                ...response.data.data
            }));
        
        } catch(err) {
            if(err.response) {
                toast.error(err.response.data?.message);
                navigate("/login");
            } else {
                console.log("GET USE DEATILS ERROR LOGS...", err);
                toast.error("Could not get user data");
            }
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export const getUserEnrolledCourses = async(token) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        });

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response.data.data;
    } catch(err) {
        if(err.response) {
            toast.error(err.response.data?.message);
        } else {
            console.log("GET_USER_ENROLLED_COURSES_API API ERROR...", err);
            toast.error("Could Not Get Enrolled Courses");
        }
    }
    toast.dismiss(toastId);
    return result;
}

export const getInstructorData = async(token) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
            Authorization: `Bearer ${token}`,
        });
        result = response?.data?.courses;
    } catch(err) {
        if(err.response) {
            toast.error(err.response.data?.message);
        } else {
            console.log("GET_INSTRUCTOR_DATA_API API ERROR...", err);
            toast.error("Could Not Get Instructor Data");
        }
    }
    toast.dismiss(toastId);
    return result;
}  