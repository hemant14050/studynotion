import React from 'react';
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.svg";
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import CTAButton from "./Button";

const LerningLanguageSection = () => {
  return (
    <div className='w-11/12 mx-auto max-w-maxContent flex flex-col mt-[130px] gap-5'>
        <div className='text-4xl font-semibold text-center'>
            Your Swiss Knife for
            <HighlightText text={" learning any language"} />
        </div>

        <div className='text-center text-richblack-600 mx-auto text-base md:w-[55%]'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-col lg:flex-row items-center justify-center mt-10'>
            <img src={know_your_progress} 
            alt='know your progress'
            className='object-contain lg:-mr-[120px]'
            />
            <img src={compare_with_others} 
            alt='compare with others' 
            className='object-contain'
            />
            <img src={plan_your_lessons} 
            alt='plan your lessons' 
            className='object-contain lg:-ml-[130px]'  
            />
        </div>

        <div className='mx-auto mb-20'>
            <CTAButton
            active={true}
            linkTo={"/login"}
            >
            Learn more
            </CTAButton>
        </div>
    </div>
  )
}

export default LerningLanguageSection;