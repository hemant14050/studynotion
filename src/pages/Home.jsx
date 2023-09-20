import React, { useState } from 'react';
import {Link} from "react-router-dom";
import {FaArrowRight} from "react-icons/fa";
import HighlightText from "../components/core/Home/HighlightText";
import CTAButton from "../components/core/Home/Button";
import Banner from "../assets/Images/banner.mp4";
import LearnCard from '../components/core/Home/LearnCard';
import {HomePageExplore} from "../data/homepage-explore";
import CodeBlocks from "../components/core/Home/CodeBlocks";
import TimeLineSection from "../components/core/Home/TimeLineSection";
import LearningLanguageSection from "../components/core/Home/LearningLanguageSection";
import InstructorSection from "../components/core/Home/InstructorSection";
import Footer from '../components/common/Footer';

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeDataIndex, setActiveDataIndex] = useState(0);
  return (
    <>
        {/* section 1 */}
        <div className='relative mx-auto flex flex-col max-w-maxContent w-11/12 items-center text-white justify-between'>
            {/* button */}
            <Link to={"/signup"} >
                <div className='group border-b-[1px] mt-16 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-50 transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex items-center gap-2 px-10 py-2 rounded-full group-hover:bg-richblack-900'>
                        <div>
                            Become an Instructor
                        </div>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>
            
            <div className='lg:text-center text-4xl font-semibold mt-7'>
                Empower Your Future with
                <HighlightText text={" Coding Skills"} />
            </div>

            <div className='md:w-[60%] md:text-center text-richblack-400 font-semibold mt-4'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            {/* two buttons */}
            <div className='flex gap-7 mt-8'>
                <CTAButton active={true} linkTo={"/signup"}>
                    Learn More
                </CTAButton>

                <CTAButton linkTo={"/login"} >
                    Book a Demo
                </CTAButton>
            </div>

            {/* video */}
            <div className='mx-4 my-14 shadow-[-5px_-5px_50px_-5px] shadow-blue-200'>
                <video className='max-h-[600px] border-none shadow-[15px_15px_rgba(255,255,255)]'
                muted
                loop
                autoPlay
                >
                    <source src={Banner} type='video/mp4' />
                </video>
            </div>

            {/* code blocks */}
            <div className="">
                <div className='my-[100px]'>
                    <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl'>
                        Unlock your
                        <HighlightText text={" coding potential "}/> 
                        with our online courses.
                        </div>
                    }
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    ctabtn1={
                        {
                            active:true, 
                            btnText:"Try it Yourself", 
                            linkTo:"/signup"
                        }
                    } 
                    ctabtn2={
                        {
                            active:false, 
                            btnText:"Learn More", 
                            linkTo:"/login"
                        }
                    } 
                    code={'<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet" href="styles.css"></head>\n<body>\n<h1>\n<nav>\n<a href="/one">One</a></nav>\n</body>'}
                    codeColor={"text-yellow-25"}
                    gradient={"codeblockGradient1"}
                    />
                </div>   


                <div className='my-[100px]'>
                    <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl'>
                        Start
                        <HighlightText text={" coding in seconds"}/> 
                        </div>
                    }
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    ctabtn1={
                        {
                            active:true, 
                            btnText:"Continue Lesson", 
                            linkTo:"/signup"
                        }
                    } 
                    ctabtn2={
                        {
                            active:false, 
                            btnText:"Learn More", 
                            linkTo:"/login"
                        }
                    } 
                    code={'<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title></head>\n<body>\n<h1><a href="/"> Header </a></h1>\n<nav>\n<a href="/one">One</a><a href="/two">Two</a>\n</nav>\n</body>'}
                    codeColor={"text-richblack-50"}
                    gradient={"codeblockGradient2"}
                    />
                </div>          

            </div>
            
            {/* learn cards */}
            <div className='my-14'>
                <div className='flex flex-col justify-center'>
                    <div className='text-4xl lg:text-center mx-auto'>
                        Unlock the 
                        <HighlightText text={" Power of Code"} />
                    </div>
                    <div className='text-richblack-400 font-semibold mt-4  lg:mx-auto'>
                    Learn to Build Anything You Can Imagine
                    </div>
                </div>

                <div className='lg:flex hidden  bg-richblack-800 px-1 py-1 rounded-full justify-between text-richblack-400 font-bold max-w-4xl mx-auto mt-10'>
                    {
                        HomePageExplore.map((course, index) => {
                            return (
                                <button 
                                key={index}
                                onClick={()=>{setActiveDataIndex(index); setActiveIndex(0)}}
                                className={`${activeDataIndex === index? "bg-richblack-900 rounded-full text-richblack-100":""} px-4 py-2`}
                                >{course.tag}</button>
                            )
                        })
                    }
                </div>

                <div className='flex flex-row justify-center flex-wrap gap-8 mt-10'>
                    {
                        
                        HomePageExplore[activeDataIndex].courses.map((course, index) => {
                            return ( 
                                <div 
                                key={course.heading}
                                onClick={()=>{setActiveIndex(index)}}>
                                    <LearnCard   
                                    active={activeIndex === index} 
                                    heading={course.heading}
                                    description={course.description}
                                    level={course.level}
                                    lessionNumber={course.lessionNumber}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>

        {/* section2 */}
        <div className='bg-pure-greys-5 text-richblack-700 mt-[-170px]'>

            {/*bg texture vala  */}
            <div className='homeBg_Image h-[333px]'>  
                <div className='w-11/12 max-w-maxContent flex items-center gap-5 mx-auto'>
                    <div className='flex gap-2 text-white mt-[190px] mx-auto'>
                        <CTAButton className={"flex flex-row gap-2 items-center"} active={true} linkTo={"/signup"}>
                            <div>
                                Explore Full Catelog
                            </div>
                            <FaArrowRight/>
                        </CTAButton>

                        <CTAButton active={false} linkTo={"/login"}>
                            <div>
                               Learn More
                            </div>
                        </CTAButton>
                    </div>   
                </div>
            </div>
            
            <div className='w-11/12 mx-auto max-w-maxContent flex items-center justify-between gap-10 flex-col mt-16 lg:flex-row'>
                <div className='lg:w-[50%]'>
                    <div className='lg:text-center text-4xl font-semibold mt-7'>
                        Get the skills you need for a
                        <HighlightText text={" job that is in demand."} />
                    </div>
                </div>
                <div className='lg:w-[40%] flex flex-col gap-5'>
                    <div className='text-richblack-400 text-[16px]'>
                    The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                    </div>

                    <CTAButton active={true} linkTo={"/login"}>
                        Learn More
                    </CTAButton>
                </div>
            </div>

            <TimeLineSection/>
            <LearningLanguageSection/>
        </div>


        {/* section 3 */}
        <div className='bg-richblack-900 text-white w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8'>
            <InstructorSection/>

            <h2 className='text-center text-4xl font-bold mt-10'>Review from Other Learners</h2>

            {/* <ReviewSlider/> */}
        </div>

        {/* footer */}
        <Footer/>

    </>
  )
}

export default Home