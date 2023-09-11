import React from 'react';
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImg from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    logo: Logo1,
    heading: "Leadership",
    description: "Fully commited to the success comapany"
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority"
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skill"
  },
  {
    logo: Logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution"
  },
];

const TimeLineSection = () => {
  return (
    <div className='w-11/12 mx-auto max-w-maxContent flex items-center justify-between gap-20 flex-col my-20 lg:flex-row'>
        <div className='lg:w-[45%] flex flex-col gap-10'>
        {
          timeline.map((element, index) => {
            return (
              <div 
              key={index}
              className='flex gap-5 w-full'>
                <div className='flex flex-col items-center'>
                  <div className='h-[50px] w-[50px] bg-white flex items-center justify-center rounded-full'>
                      <img src={element.logo} alt='imagesTHi' />
                  </div>

                  {index !== 3 &&
                  <div className='h-[50px] hidden md:block border-l-2 border-dotted border-richblack-200 mt-5'></div>}
                </div>

                <div>
                  <h2 className='font-semibold text-[18px] '>
                    {element.heading}
                  </h2>
                  <p className='text-base'> {element.description}</p>
                </div>

              </div>
            )
          })
        }
        </div> 

        <div className='relative shadow-[10px_10px_white]'>
            <img 
            className='shadow-blue-200 shadow-[-10px_-10px_30px] object-cover h-fit' 
            src={timelineImg} alt='timeline' />

            <div className='absolute left-[50%] translate-x-[-50%] translate-y-[-50%] bg-caribbeangreen-700 flex flex-col gap-5 md:flex-row text-white uppercase py-7'>
                <div className='flex flex-row gap-10 px-10 items-center border-r border-caribbeangreen-300'>
                  <p className='text-3xl font-bold'>10</p>
                  <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                </div>

                <div className='flex gap-10 items-center px-10'>
                  <p className='text-3xl font-bold'>250</p>
                  <p className='text-caribbeangreen-300 text-sm'>Type of Courses</p>
                </div>
            </div>


        </div>
    </div>
  )
}

export default TimeLineSection;