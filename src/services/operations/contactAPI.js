import toast from "react-hot-toast";
import {setLoading} from "../../store/slices/authSlice";

export const sendContactInfo = (formData) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            console.log(formData);
            setTimeout(()=> {
                toast.success("Form submitted successfully!");
            }, 5000);
        } catch(err) {
            
        }
        setTimeout(()=> {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }, 5000);
    }
}