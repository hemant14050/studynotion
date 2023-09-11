import React from 'react';
import {FaArrowRight} from "react-icons/fa";
import CTAButton from "./Button";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, code, gradient, codeColor
}) => {
  return (
    <div className={`flex flex-col justify-between ${position} gap-16`}>

        {/* left part */}
        <div className='lg:w-[45%] flex flex-col'>
            {heading}

            <div className='text-richblack-400 font-semibold mt-5'>
            {subheading}
            </div>
            <div className='flex gap-7 justify-start mt-5'>
                <CTAButton className={"flex items-center gap-2"} active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
                    <div>
                        {ctabtn1.btnText}
                    </div> 
                    <FaArrowRight/>
                </CTAButton>

                <CTAButton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
                    {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>

        {/* right part */}
        <div className={`lg:w-[38%] p-3 h-fit border border-richblack-400 flex relative`}>

            <div className={`${gradient} absolute w-[60%] h-[60%]`}></div>

            <div className='flex text-richblack-400 font-inter font-bold flex-col w-[10%] items-center'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={`${codeColor} w-[90%] flex flex-col gap-2 font-mono font-bold pr-2`}>
                <TypeAnimation
                    sequence={[code, 1000, ""]}
                    style={
                        {
                            whiteSpace: "pre-line",
                            display: "block"
                        }
                    }
                    speed={50}
                    cursor={true}
                    repeat={Infinity}
                    omitDeletionAnimation={true}
                />
            </div>

        </div>
    </div>
  )
}

export default CodeBlocks;