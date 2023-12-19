import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BiCloudUpload} from "react-icons/bi";
import IconBtn from "../../../common/IconBtn";
import { updateProfilePic } from '../../../../services/operations/settingsAPI';
import toast from 'react-hot-toast';

const ChangeProfilePic = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null)
    const [previewFile, setPreviewFile] = useState(null);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImageFile(file);
            previewFileHandler(file);
        }
    }

    const previewFileHandler = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewFile(reader.result);
        }
    }

    const handleFileUpload = (e) => {
        if(!imageFile) {
            toast.error("Please select profile pic to upload");
            return;
        }
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("displayPicture", imageFile);
            dispatch(updateProfilePic(user, token, formData)).then(() => {
                setImageFile(null);
                setPreviewFile(null);
                setLoading(false);
            });
        } catch(error) {
            console.log("ERROR MESSAGE - ", error.message);
        }
    }

    useEffect(() => {
        if(imageFile) {
            setPreviewFile(imageFile);
        }
    }, [imageFile]);

    return (
        <>
            <div className='bg-richblack-800 flex items-center px-5 py-10 md:px-10 rounded-lg border-[1px] border-richblack-700'>
                <div className='flex items-center gap-6'>
                    <img 
                    src={previewFile || user?.image} 
                    alt={`profile-${user?.firstName}`}
                    width={78}
                    height={78}
                    className='rounded-full'
                    />
                    <div>
                        <p
                        className='text-richblack-5 text-lg'
                        > Change Profile Picture </p>
                        <div className='flex flex-col md:flex-row gap-4 mt-3'> 
                        <label htmlFor='profileUploader'
                        className='px-4 py-2 flex justify-center bg-richblack-700 text-richblack-5 font-bold rounded-lg cursor-pointer'
                        >
                            <input 
                            type='file'
                            onChange={(e) => {handleChange(e)}}
                            id='profileUploader'
                            className='hidden opacity-0'
                            accept='.jpg,.png,.jpeg'
                            />

                            <p>Select</p>
                        </label>

                        <IconBtn
                        text={loading ? "Uploading..." : "Upload"}
                        disabled={loading ? true: false}
                        onClick={handleFileUpload}
                        className={`flex justify-center ${loading && "disabled:cursor-not-allowed"}`}
                        >
                            {!loading && (
                            <BiCloudUpload size={24} />
                            )}
                        </IconBtn>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangeProfilePic