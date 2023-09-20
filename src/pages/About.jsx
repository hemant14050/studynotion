import React from 'react';
import Footer from "../components/common/Footer";
import HighlightText from "../components/core/Home/HighlightText";
import aboutus1 from "../assets/Images/aboutus1.webp";
import aboutus2 from "../assets/Images/aboutus2.webp";
import aboutus3 from "../assets/Images/aboutus3.webp";
import {BiSolidQuoteLeft, BiSolidQuoteRight} from "react-icons/bi";
import foundingStory from "../assets/Images/FoundingStory.png";
import CTAButton from "../components/core/Home/Button";
import InfoCard from '../components/core/About/InfoCard';
import ContactForm from "../components/core/About/ContactForm"
import Loader from "../components/common/Loader";
import {useSelector} from "react-redux";

const About = () => {
  const numbersData = {
    activeStudents: {
      count: "5K",
      text: "Active Students"
    },
    mentors: {
      count: "10+",
      text: "Mentors"
    },
    courses: {
      count: "200+",
      text: "Courses"
    },
    awards: {
      count: "50+",
      text: "Awards"
    },
  }

  const {loading} = useSelector((state) => state.auth);

  return (
    <div className='bg-richblack-900 text-richblack-5'>
      <div className='bg-richblack-800 pt-16'>
        <div className='w-11/12 h-[450px] max-w-maxContent mx-auto text-richblack-5'>
            <div className="flex flex-col items-center">
              <h1 className='text-4xl font-bold md:text-center max-w-[700px] text-richblack-5'>
              Driving Innovation in Online Education for a 
              <HighlightText text={" Brighter Future"} />
              </h1>

              <p className='text-richblack-200 text-base max-w-[740px] md:text-center mt-5'>
              Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
              </p>
            </div>
        </div>
      </div>
      
      <div className='border-b mb-10 border-richblack-600 -mt-[100px] md:-mt-[200px]'>
        <div className='w-11/12 max-w-maxContent mx-auto text-richblack-5'>
          <div className='flex flex-wrap justify-center items-center lg:flex-row gap-5'>
            <img src={aboutus1} alt='aboutus1'
            className='max-w-[90%]'
            />
            <img src={aboutus2} alt='aboutus2'
            className='shadow-[-5px_-20px_80px_-20px_#FFA500] max-w-[90%]'
            />
            <img src={aboutus3} alt='aboutus3'
            className='max-w-[90%]'
            />
          </div>

          <div className='my-24 text-3xl md:text-4xl font-bold leading-[52px] md:text-center text-richblack-100'>
            <BiSolidQuoteLeft className='inline -mt-8 mr-2'/>
            We are passionate about revolutionizing the way we learn. Our innovative platform 
            <span className='text-blue-200'> combines technology</span>, 
            <span className='text-[#E65C00]'> expertise</span>, and community to create an 
            <span className='text-yellow-50'> unparalleled educational experience</span>.
            <BiSolidQuoteRight className='inline -mt-8 ml-2' />
          </div>
        </div>
      </div>


      <div className='my-24'>
        <div className='w-11/12 max-w-maxContent mx-auto text-richblack-5 flex flex-col md:flex-row items-center justify-between gap-10'>
            <div className='md:w-[450px] flex flex-col gap-6'>
              <p className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045]'>
              Our Founding Story 
              </p>

              <div className='text-base text-richblack-300 flex flex-col gap-4'>
                <p>
                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                </p>
                <p>
                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                </p>
              </div>
            </div>


            <div className='mt-14'>
              <img src={foundingStory} alt='founding_story'
              className='shadow-[0px_-20px_90px_#FCB045]'
               />
            </div>
        </div>
      </div>

      <div className='my-24'>
        <div className='w-11/12 max-w-maxContent mx-auto text-richblack-5 flex flex-col md:flex-row items-center justify-between gap-10'>
          <div className='md:w-[450px] flex flex-col gap-6'>
            <p className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E65C00] to-[#F9D423]'>
            Our Vision
            </p>

            <div className='text-base text-richblack-300'>
              <p>
              With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
              </p>
            </div>
          </div>

            <div className='md:w-[450px] flex flex-col gap-6'>
              <p className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]'>
              Our Mission
              </p>

              <div className='text-base text-richblack-300'>
                <p>
                our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                </p>
              </div>
            </div>
            
        </div>
      </div>

      <div className='bg-richblack-800 py-20 my-24'>
        <div className='w-11/12 max-w-maxContent mx-auto text-richblack-5 grid grid-cols-2 gap-10 lg:grid-cols-4 text-4xl font-bold'>
            {
              Object.keys(numbersData).map((key, index) => {
                return (<div key={index} className='text-center'>
                  {numbersData[key].count}
                  <p
                  className='text-base font-medium text-richblack-300'
                  >{numbersData[key].text}</p>
                </div>)
              })
            }
        </div>
      </div>

      <div className='my-24'>
        <div className='w-11/12 max-w-maxContent mx-auto text-richblack-5'>
            <div className='flex flex-col lg:flex-row items-center gap-10'>
              <div className='lg:w-[50%]'>
                <p className='text-4xl font-bold'>World-Class Learning for 
                  <HighlightText text={" Anyone, Anywhere"} />
                </p>

                <p className='text-richblack-300 mt-4 text-base'>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>

                <CTAButton className={"mt-10"} active={true} linkTo={"/login"}>Learn More </CTAButton>
              </div>

              <div className='flex flex-col items-center lg:flex-row'>
                  <InfoCard 
                  className={"bg-richblack-700"}
                  heading={"Curriculum Based on Industry Needs"}
                  body={"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."}
                  />
                  <InfoCard 
                  className={"bg-richblack-800"}
                  heading={"Our Learning Methods"}
                  body={"The learning process uses the namely online and offline."}
                  />
              </div>
            </div>
            <div className='flex justify-center lg:justify-end'>
              <div className='flex flex-col items-center lg:flex-row'>
                <InfoCard 
                className={"bg-richblack-700"}
                heading={"Certification"}
                body={"You will get a certificate that can be used as a certification during job hunting."}
                />
                <InfoCard 
                className={"bg-richblack-800"}
                heading={'Rating "Auto-grading"'}
                body={"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."}
                />
                <InfoCard 
                className={"bg-richblack-700"}
                heading={"Ready to Work"}
                body={"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."}
                />
              </div>
            </div>
        </div>
      </div>


      <div className='w-11/12 max-w-maxContent mx-auto my-20 mt-[150px] flex flex-col items-center'>
            <div className='text-center'>
              <div className='text-richblack-5 font-bold text-4xl'>
                Get in Touch
              </div>
              <div className='text-base text-richblack-300 mt-2'>
                We'd love to here for you, Please fill out this form.
              </div>
            </div>
            <div className='max-w-[550px] mt-10'>
            {
              loading?
              (<div className='flex w-full h-[350px] justify-center items-center'>
                  <Loader />
              </div>):
              (
                  <ContactForm/>
              )
            }
            </div>
      </div>

      <div className='w-11/12 max-w-maxContent mx-auto my-24 flex flex-col items-center'>
        <h2 className='text-center text-richblack-5 text-4xl font-bold mt-10'>Review from Other Learners</h2>

        {/* <ReviewSlider/> */}
      </div>
      

      <Footer />
    </div>
  )
}

export default About