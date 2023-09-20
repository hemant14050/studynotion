import React, {useState} from 'react';
import countryCodeData from "../../../data/countrycode.json";
import { useDispatch } from 'react-redux';
import {sendContactInfo} from "../../../services/operations/contactAPI";

const ContactForm = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "",
        mobile: "",
        message: ""
    });

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            countryCode: "",
            mobile: "",
            message: ""
        });

        dispatch(sendContactInfo(formData));
    }

    return (
        <form
        onSubmit={handleOnSubmit}
        className='flex flex-col gap-4'
        >
            <div className='flex flex-col lg:flex-row justify-between gap-4'>
                <div className='w-full'>
                    <label htmlFor='firstName'>
                        <p className='text-richblack-5'>First Name</p>
                        <input 
                        required
                        value={formData.firstName}
                        onChange={(e) => handleOnChange(e)}
                        className='mt-1 p-3 rounded-lg bg-richblack-800 text-richblack-200 border-b w-full'
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
                        required
                        value={formData.lastName}
                        onChange={(e) => handleOnChange(e)}
                        className='mt-1 p-3 rounded-lg bg-richblack-800 text-richblack-200 border-b w-full'
                        name='lastName'
                        id='lastName'
                        type='text'
                        placeholder='Enter last name'
                        />
                    </label>
                </div>
            </div>

            <div className='w-full'>
                <label htmlFor='email'>
                    <p className='text-richblack-5'>Email</p>
                    <input 
                    required
                    value={formData.email}
                    onChange={(e) => handleOnChange(e)}
                    className='mt-1 p-3 rounded-lg bg-richblack-800 text-richblack-200 border-b w-full'
                    name='email'
                    id='email'
                    type='email'
                    placeholder='Enter email address'
                    />
                </label>
            </div>

            <div className='w-full'>
                <label htmlFor='mobile'>
                    <p className='text-richblack-5'>Phone Number</p>
                    <div className='flex gap-2'>
                        <select id='countryCode'
                        required
                        value={formData.countryCode}
                        onChange={(e) => handleOnChange(e)}
                        name='countryCode'
                        className='mt-1 p-1 rounded-lg bg-richblack-800 text-richblack-200 border-b w-[100px]'
                        >
                            {
                                countryCodeData.map((country) => {
                                    return (
                                        <option 
                                        key={country.country}
                                        className='text-richblack-5 bg-richblack-800'
                                        id={country.country} 
                                        name={country.country} 
                                        value={country.code}>{country.code} - {country.country}
                                        </option>
                                    );
                                })
                            }
                        </select>
                        <input 
                        required
                        value={formData.mobile}
                        onChange={(e) => handleOnChange(e)}
                        className='mt-1 p-3 rounded-lg bg-richblack-800 text-richblack-200 border-b w-full'
                        name='mobile'
                        id='mobile'
                        type='mobile'
                        placeholder='1234567890'
                        />
                    </div>
                </label>
            </div>

            <div className='w-full'>
                <label htmlFor='message'>
                    <p className='text-richblack-5'>Message</p>
                    <textarea 
                    required
                    value={formData.message}
                    onChange={(e) => handleOnChange(e)}
                    className='mt-1 p-3 rounded-lg bg-richblack-800 text-richblack-200 border-b w-full'
                    name='message'
                    id='message'
                    type='message'
                    placeholder='Enter your message here...'
                    />
                </label>
            </div>

            <button type='submit'
            className='p-3 text-base bg-yellow-50 text-center w-full text-richblack-900 rounded-lg'
            >
                Send Message
            </button>
        </form>
    )
}

export default ContactForm;