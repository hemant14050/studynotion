import React from 'react'

const InfoCard = ({className, heading, body}) => {
  return (
    <div className={`p-8 w-[350px] min-h-[300px] ${className}`}>
        <p className='text-richblack-5 text-lg font-bold'>{heading}</p>
        <p className='text-richblack-300 mt-5'>{body}</p>
    </div>
  )
}

export default InfoCard;