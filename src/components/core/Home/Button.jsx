import React from 'react'
import { Link } from 'react-router-dom';

const Button = ({className, children, active, linkTo}) => {
  return (
    <Link to={linkTo}>
        <div className={`${className} max-w-fit text-center text-[16px] px-6 py-3 rounded-md font-[500]
        ${active? "bg-yellow-50 text-black":"bg-richblack-800"}
        hover:scale-95 transition-all duration-200
        border-richblack-25 border-b-[1px] border-r-[1px]
        `}>
            {children}
        </div>
    </Link>
  )
}

export default Button;