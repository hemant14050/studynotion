import React from 'react';
import instructorImg from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import { FaArrowRight } from 'react-icons/fa';
import CTAButton from "./Button";

const InstructorSection = () => {
  return (
    <div className='flex flex-col lg:flex-row gap-20 items-center mt-[130px] my-16'>
        <div className='lg:w-[50%]'>
            <img src={instructorImg} 
            alt='instructorImage'
            className='shadow-[10px_10px_white]'
             />
        </div>

        <div className='lg:w-[50%] flex flex-col gap-10'>
            <div className='flex flex-col gap-5'>
                <div className='text-4xl font-semibold flex flex-col'>
                    <div>
                    Become an 
                    </div>
                    <HighlightText className={"mx-0"} text={"Instructor"} />
                </div>

                <p className='text-richblack-400 font-semibold'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>
            </div>

            <CTAButton
            active={true}
            linkTo={"/signup"}
            className={"flex items-center gap-4"}
            >
                <div>
                Start Teaching Today
                </div>
                <FaArrowRight />
            </CTAButton>
        </div>
    </div>
  )
}

export default InstructorSection;