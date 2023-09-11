import React from 'react';
import FooterLogo from "../../assets/Logo/Logo-Full-Light.png";
import {FaFacebook, FaGoogle, FaTwitter, FaYoutube} from "react-icons/fa";
import { Link } from 'react-router-dom';
import {FooterLink2} from "../../data/footer-links";

const Footer = () => {
  return (
    <div className='w-11/12 mx-auto flex flex-col gap-10 max-w-maxContent pt-14 pb-6 text-richblack-400'>
        
        <div className='flex flex-col gap-10 md:flex-row justify-between'>
            <div className='grid gap-14 grid-cols-2 lg:grid-cols-3 pr-10 lg:border-r lg:border-richblack-600'>
                <div className='flex flex-col gap-4'>
                    <Link to={"/"}>
                    <img src={FooterLogo} alt='logo' width={160} height={32} />
                    </Link>
                    <div className='flex flex-col gap-2'>
                        <p className='text-[16px] text-richblack-100 font-bold cursor-pointer'>Company</p>
                        <p className='text-sm cursor-pointer'>About</p>
                        <p className='text-sm cursor-pointer'>Careers</p>
                        <p className='text-sm cursor-pointer'>Affiliates</p>
                    </div>

                    <div className='flex gap-4 text-xl'>
                        <FaFacebook className='cursor-pointer' />
                        <FaGoogle className='cursor-pointer' />
                        <FaTwitter className='cursor-pointer' />
                        <FaYoutube className='cursor-pointer' />
                    </div>
                </div>

                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-[16px] text-richblack-100 font-bold cursor-pointer'>Resources</p>
                        <p className='text-sm cursor-pointer'>Articles</p>
                        <p className='text-sm cursor-pointer'>Blogs</p>
                        <p className='text-sm cursor-pointer'>Chart Sheet</p>
                        <p className='text-sm cursor-pointer'>Code Challenges</p>
                        <p className='text-sm cursor-pointer'>Docs</p>
                        <p className='text-sm cursor-pointer'>Projects</p>
                        <p className='text-sm cursor-pointer'>Videos</p>
                        <p className='text-sm cursor-pointer'>Worksplaces</p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='text-[16px] text-richblack-100 font-bold cursor-pointer'>Support</p>
                        <p className='text-sm cursor-pointer'>Help Center</p>
                    </div>
                </div>

                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-[16px] text-richblack-100 font-bold cursor-pointer'>Plan</p>
                        <p className='text-sm cursor-pointer'>Paid Mentorships</p>
                        <p className='text-sm cursor-pointer'>For Students</p>
                        <p className='text-sm cursor-pointer'>Bussiness Solutions</p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='text-[16px] text-richblack-100 font-bold cursor-pointer'>Community</p>
                        <p className='text-sm cursor-pointer'>Forums</p>
                        <p className='text-sm cursor-pointer'>Chapters</p>
                        <p className='text-sm cursor-pointer'>Events</p>
                    </div>
                </div>
            </div>

            <div className='grid gap-14 grid-cols-2 lg:grid-cols-3'>
                {
                    FooterLink2.map((FooterLink, index) => {
                        return (
                            <div key={index} className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-2'>
                                    <p className='text-[16px] text-richblack-100 font-bold cursor-pointer'>{FooterLink.title}</p>
                                    {
                                        FooterLink.links?.map((sub, index) => {
                                            return (
                                                <Link key={index} to={sub.link}>
                                                    <p className='text-sm cursor-pointer'>{sub.title}</p>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        
        <div className='mx-auto'>
            Made with ❤️ by Hemant Patil
        </div>
    </div>
  )
}

export default Footer;