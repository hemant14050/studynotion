import React, {useState} from 'react';
import IconBtn from '../../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileDetails } from '../../../../services/operations/settingsAPI';

const genderList = ["Male", "Female", "Prefer not to say"];

const EditProfile = () => {
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        dateOfBirth: user?.additionalDetailes?.dateOfBirth || "",
        gender: user?.additionalDetailes?.gender || "",
        contactNumber: user?.additionalDetailes?.contactNumber || "",
        about: user?.additionalDetailes?.about || ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfileDetails(user, token, formData));
    }

    return (
        <>
            <form 
            onSubmit={handleSubmit}
            className='w-full'
            >
            <div className='bg-richblack-800 justify-between items-center px-5 py-8 md:px-8 rounded-lg border-[1px] border-richblack-700'>
                <div className='flex justify-between w-full items-center gap-6'>
                    <p
                    className='text-xl text-richblack-5'
                    >Personal Details</p>
                </div>

                <div
                className='mt-4 w-full flex flex-col gap-6 text-base'>
                    <div className='flex w-full flex-col lg:flex-row justify-between gap-4'>
                    <div className='w-full'>
                        <label htmlFor='firstName'>
                            <p className='text-richblack-5'>First Name</p>
                            <input 
                            value={user.firstName}
                            disabled
                            className='mt-1 p-3 rounded-lg bg-richblack-700 text-richblack-5 border-b w-full outline-0'
                            name='firstName'
                            id='firstName'
                            type='text'
                            placeholder='Enter first name'
                            />
                        </label>
                    </div>

                    <div className='w-full'>
                        <label htmlFor='lastName'>
                            <p className='text-richblack-5'>Last Name</p>
                            <input
                            value={user.lastName}
                            disabled
                            className='mt-1 p-3 rounded-lg bg-richblack-700 text-richblack-5 border-b w-full outline-0'
                            name='lastName'
                            id='lastName'
                            type='text'
                            placeholder='Enter last name'
                            />
                        </label>
                    </div>
                    </div>

                    <div className='flex w-full flex-col lg:flex-row justify-between gap-4'>
                    <div className='w-full'>
                        <label htmlFor='dateOfBirth'>
                            <p className='text-richblack-5'>Date of Birth</p>
                            <input 
                            value={formData.dateOfBirth}
                            onChange={(e) => {handleChange(e)}}
                            className='mt-1 p-3 rounded-lg bg-richblack-700 text-richblack-5 border-b w-full outline-0'
                            name='dateOfBirth'
                            id='dateOfBirth'
                            type='date'
                            />
                        </label>
                    </div>

                    <div className='w-full'>
                        <label htmlFor='gender'>
                            <p className='text-richblack-5'>Gender</p>
                            <select
                            defaultValue={formData.gender || ""}
                            onChange={(e) => handleChange(e)}
                            className='mt-1 p-3 rounded-lg bg-richblack-700 text-richblack-5 border-b w-full outline-0'
                            name='gender'
                            id='gender'
                            type='text'
                            placeholder='Enter last name'
                            >
                                <option value={""} disabled className='bg-white text-black'>---SELECT---</option>
                                {
                                    genderList.map((gender, index) => {
                                        return (
                                            <option key={index} value={gender} className='bg-white text-black'>{gender}</option>
                                        )
                                    })
                                }
                            </select>
                        </label>
                    </div>
                    </div>

                    <div className='lg:w-[50%]'>
                    <label htmlFor='contactNumber'>
                        <p className='text-richblack-5'>Contact Number</p>
                        <input
                        value={formData.contactNumber}
                        onChange={(e)=>{handleChange(e)}}
                        className='mt-1 p-3 rounded-lg bg-richblack-700 text-richblack-5 border-b w-full outline-0'
                        name='contactNumber'
                        id='contactNumber'
                        type='text'
                        placeholder='Enter contact number'
                        />
                    </label>
                    </div>

                    <div className='w-full'>
                    <label htmlFor='about'>
                        <p className='text-richblack-5'>About</p>
                        <textarea
                        rows={3}
                        value={formData.about}
                        onChange={(e)=>{handleChange(e)}}
                        className='mt-1 p-3 rounded-lg bg-richblack-700 text-richblack-5 border-b w-full outline-0'
                        name='about'
                        id='about'
                        type='text'
                        placeholder='Enter about yourself'
                        />
                    </label>
                    </div>
                </div>
                
            </div>

            <div className='flex justify-end mt-5 gap-5'>
                <button
                onClick={() => navigate("/dashboard/my-profile")}
                className='px-4 py-2 bg-richblack-700 text-richblack-5 font-bold rounded-lg'
                >
                Cancel 
                </button>
                <IconBtn type={"submit"} text={"Save"}/>
            </div>
            </form>
        </>
    )
}

export default EditProfile