import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='fixed left-0 top-0 w-full h-[100vh] z-[1000] flex justify-center items-center backdrop-blur-sm transition-all duration-200'>
        <div className='bg-richblack-800 text-richblack-200 opacity-100 p-10 border-[1px] border-richblack-600 rounded-lg'>
            <p className='text-richblack-5 font-bold text-2xl'>
                {modalData.text1}
            </p>
            <p className='text-base font-medium my-3'>
                {modalData.text2}
            </p>
            <div className='w-full flex justify-between mt-5'>
                <IconBtn 
                onClick={modalData?.btn1Handler}
                text={modalData?.btn1Text}
                />

                <button 
                className='px-4 py-2 bg-richblack-200 font-bold text-richblack-800 rounded-lg'
                onClick={modalData?.btn2Handler}
                >
                    {modalData?.btn2Text}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal;