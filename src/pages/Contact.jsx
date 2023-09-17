import React, { useState } from 'react';
import {HiChatBubbleLeftRight} from "react-icons/hi2";
import {PiPhoneCallFill} from "react-icons/pi";
import {FaEarthAsia} from "react-icons/fa6";
import countryCodeData from "../data/countrycode.json";
import Footer from '../components/common/Footer';

const Contact = () => {
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
    }

    return (
        <>
            <div className='w-11/12 max-w-maxContent mx-auto my-5 bg-richblack-900 text-richblack-200'>
                {/* section 1 */}
                <div className='w-full text-base flex flex-col lg:flex-row gap-14'>
                    <div className='bg-richblack-800 h-fit p-4 rounded-lg flex flex-col gap-6 w-full lg:min-w-[450px]'>
                        <div className='flex gap-3'>
                            <div>
                                <HiChatBubbleLeftRight size={24} />
                            </div>
                            <div>
                                <p className='text-lg text-richblack-5'>
                                    Chat with us
                                </p>
                                <div>
                                Our friendly team is here to help.
                                <p>studynotion.hp@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-3'>
                            <div>
                                <FaEarthAsia size={24} />
                            </div>
                            <div>
                                <p className='text-lg text-richblack-5'>
                                    Visit us
                                </p>
                                <div>
                                Come and say hello at our office HQ.
                                <p>Here is the location/ address</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-3'>
                            <div>
                                <PiPhoneCallFill size={24} />
                            </div>
                            <div>
                                <p className='text-lg text-richblack-5'>
                                    Call us
                                </p>
                                <div>
                                Mon - Fri From 8am to 5pm
                                <p>+123 456 7890</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-4 border border-richblack-600 p-5 lg:p-10 rounded-lg'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-4xl font-bold text-richblack-5'>
                            Got a Idea? We've got the skills. 
                            <p>Let's team up</p>
                            </h1>

                            <p>
                            Tell us more about yourself and what you're got in mind.
                            </p>
                        </div>

                        <form
                        onSubmit={handleOnSubmit}
                        className='flex flex-col gap-4'
                        >
                            <div className='flex flex-col lg:flex-row justify-between gap-4'>
                                <div className='w-full'>
                                    <label htmlFor='firstName'>
                                        <p className='text-richblack-5'>First Name</p>
                                        <input 
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
                                        value={formData.countryCode}
                                        onChange={(e) => handleOnChange(e)}
                                        name='countryCode'
                                        className='mt-1 p-1 rounded-lg bg-richblack-800 text-richblack-200 border-b w-[100px]'
                                        >
                                            {
                                                countryCodeData.map((country) => {
                                                    if(country.country === "+91")
                                                        return (
                                                            <option 
                                                            key={country.code}
                                                            className='text-richblack-5 bg-richblack-800'
                                                            defaultChecked={true} id={country.country} name={country.country} value={country.code}>{country.code} - {country.country}</option>
                                                        );
                                                    else
                                                        return (
                                                            <option 
                                                            key={country.country}
                                                            className='text-richblack-5 bg-richblack-800'
                                                            id={country.country} name={country.country} value={country.code}>{country.code} - {country.country}</option>
                                                        );
                                                })
                                            }
                                        </select>
                                        <input 
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

                    </div>
                </div>

                {/* section 2 */}
                <div className='mt-10 w-full'>
                    <p className='text-4xl text-center text-richblack-5 font-bold'>
                    Reviews from other learners
                    </p>
                </div>
            </div>
            
            <Footer/>
        </>
    )
}

export default Contact;