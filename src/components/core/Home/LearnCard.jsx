import React from 'react';
import {HiMiniUsers} from 'react-icons/hi2'
import {ImTree} from "react-icons/im";

const LearnCard = ({heading, description, level, lessionNumber, active}) => {

  return (
    <div className={`${active? "bg-white shadow-[10px_10px_yellow] text-richblack-800":"bg-richblack-800 text-white"} w-[360px] relative min-h-[300px] px-6 pt-8 pb-4 flex flex-col justify-between cursor-pointer`}>
        <div className=''>
            <div className='text-[20px] font-[600]'>
                {heading}
            </div>
            <div className='text-richblack-400 mt-3'>
                {description}
            </div>
        </div>

        <div className={`${active? "text-blue-200 flex justify-between font-medium":"text-richblack-100 flex justify-between font-medium"}`}>
            <div className='flex items-center gap-2'>
                <HiMiniUsers />
                {level}
            </div>

            <div className='flex items-center gap-2'>
                <ImTree />
                {lessionNumber} Lessons
            </div>
        </div>

        <div className='absolute left-0 bottom-14 w-full border-richblack-100 border-t-2 border-dashed'></div>
    </div>
  )
}

export default LearnCard