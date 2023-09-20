import {toast} from "react-hot-toast";
import { settingsEndpoints } from "../apis";
import { setLoading } from "../../store/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { logout } from "./authAPI";
import { setUser } from "../../store/slices/profileSlice";

const {
    UPDATE_PROFILE_PICTURE_API,
    UPDATE_PROFILE_DATA_API,
    CHANGE_PASSWORD_API,
    DELETE_ACCOUNT_API
} = settingsEndpoints;

export const updateProfilePic = (user, token, formData) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        // dispatch(setLoading(true));
        try {
            const response = await apiConnector("PUT", UPDATE_PROFILE_PICTURE_API, formData, {
                Authorization: `Bearer ${token}`,
            });
            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            // console.log(response?.data?.data?.image);
            dispatch(setUser({
                ...user,
                image: response?.data?.data?.image
            }));
            toast.success("Profile photo updated successfully!");

        } catch(err) {
            if(err.response) {
                toast.error(err.response.data.message);
            } else {
                console.log(err);
                toast.err("Profile updation Failed!");
            }
        }
        toast.dismiss(toastId);
        // dispatch(setLoading(false));
    }
}

export const updateProfileDetails = (user, token, {
    dateOfBirth,
    gender,
    contactNumber,
    about
}) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("PUT", UPDATE_PROFILE_DATA_API, {
                dateOfBirth,
                gender,
                contactNumber,
                about
            }, {
                Authorization: `Bearer ${token}`,
            });

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setUser({
                ...user,
                additionalDetailes: response.data.profile,
            }));
            toast.success("Profile Updated Successfully");

        } catch(err) {
            if(err.response) {
                toast.error(err.response.data.message);
            } else {
                console.log(err);
                toast.err("Account Deletion Failed!");
            }
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export const updatePassword = (token, {
    oldPassword,
    newPassword,
    confirmNewPassword
}) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", CHANGE_PASSWORD_API, {
                oldPassword,
                newPassword,
                confirmNewPassword
            }, {
                Authorization: `Bearer ${token}`,
            });
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Password updated successfully!")

        } catch(err) {
            if(err.response) {
                toast.error(err.response.data.message);
            } else {
                console.log(err);
                toast.err("Password updation Failed!");
            }
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export const deleteAccount = (token, navigate) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("DELETE", DELETE_ACCOUNT_API, null, {
                Authorization: `Bearer ${token}`,
            });
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Profile Deleted Successfully")
            dispatch(logout(navigate));

        } catch(err) {
            if(err.response) {
                toast.error(err.response.data.message);
            } else {
                console.log(err);
                toast.err("Account Deletion Failed!");
            }
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
} 