import React from 'react'

const IconBtn = ({
    text,
    onClick,
    children,
    disabled,
    outline = false,
    className,
    type
}) => {
  return (
    <button
    className={`px-4 py-2 bg-yellow-50 text-richblack-800 rounded-lg font-semibold text-base flex gap-2 items-center ${className} `}
    disabled={disabled}
    onClick={onClick}
    type={type}
    >
        {
            children? 
            (
                <>
                    <span>{text}</span>
                    {children}
                </>
            ): (text)
        }
    </button>
  )
}

export default IconBtn