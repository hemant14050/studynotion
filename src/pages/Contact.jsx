import React from 'react';
import {HiChatBubbleLeftRight} from "react-icons/hi2";
import {PiPhoneCallFill} from "react-icons/pi";
import {FaEarthAsia} from "react-icons/fa6";
import Footer from '../components/common/Footer';
import { useSelector } from 'react-redux';
import Loader from "../components/common/Loader";
import ContactForm from '../components/core/About/ContactForm';

const Contact = () => {
    const {loading} = useSelector((state) => state.auth);

    return (
        <>
            <div className='w-11/12 max-w-maxContent mx-auto my-16 bg-richblack-900 text-richblack-200'>
                {/* section 1 */}
                <div className='w-full text-base flex flex-col lg:flex-row gap-14'>
                    <div className='bg-richblack-800 h-fit p-6 rounded-lg flex flex-col gap-6 w-full lg:min-w-[450px]'>
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

                        {
                            loading?
                            (<div className='flex w-full h-[350px] justify-center items-center'>
                                <Loader />
                            </div>):
                            (
                                <ContactForm/>
                            )
                        }

                    </div>
                </div>

                {/* section 2 */}
                <div className='mt-10 w-full'>
                    <h2 className='text-center text-richblack-5 text-4xl font-bold mt-10'>Review from Other Learners</h2>

                    {/* <ReviewSlider/> */}
                </div>
            </div>
            
            <Footer/>
        </>
    )
}

export default Contact;