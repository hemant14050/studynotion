import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom';
import {GiHamburgerMenu} from "react-icons/gi";
import {FaChevronDown, FaSearch} from "react-icons/fa";
import {NavbarLinks} from "../../data/navbar-links";
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../store/slices/authSlice";
import { setUser } from "../../store/slices/profileSlice";
import { setTotalItems } from "../../store/slices/cartSlice";
import {AiOutlineShoppingCart} from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/api";


const userData = {
  "_id": "64ef077ed46e2fcf453ae5fc",
  "firstName": "Hemant",
  "lastName": "Patil",
  "email": "patilhemant14050@gmail.com",
  "accountType": "Instructor",
  "active": true,
  "approved": true,
  "additionalDetailes": {
      "_id": "64ef077ed46e2fcf453ae5fa",
      "gender": "",
      "dateOfBirth": "29.10.2002",
      "about": "Hello, my name is Hemant and I am a DEV. I have 2 years of experience in Backend Developement and specialize in Authentication and Authorization. I am passionate about Cloud and have worked on Studynotion. Please feel free to contact me for any inquiries or collaborations!",
      "contactNumber": 125648959,
      "__v": 0
  },
  "courses": [
      "64ef0d25987c54f05e4175aa"
  ],
  "image": "https://res.cloudinary.com/die361uef/image/upload/v1693386750/StudyNotion/ytmg7wf7xphk1ekubtyz.png",
  "courseProgress": [],
  "createdAt": "2023-08-30T09:10:22.874Z",
  "updatedAt": "2023-08-30T09:34:29.471Z",
  "__v": 0,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhdGlsaGVtYW50MTQwNTBAZ21haWwuY29tIiwiaWQiOiI2NGVmMDc3ZWQ0NmUyZmNmNDUzYWU1ZmMiLCJhY2NvdW50VHlwZSI6Ikluc3RydWN0b3IiLCJpYXQiOjE2OTQ0MDQ5ODcsImV4cCI6MTY5NDQ5MTM4N30.mA1pTG2Ph0KWMT_WOM0230CN7gFteyqbtPh3iKeFQho"
}

const Navbar = () => {
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({path: route}, location.pathname);
  }

  const [subLinks, setSubLinks] = useState([]);

  useEffect(()=> {
    fetchSubLinks();
  },[]);

  const fetchSubLinks = async() => {
    try {
      const response = await apiConnector({method:"GET", url:categories.CATEGORIES_API});
      // console.log(response.data.data);
      setSubLinks(response.data.data);

    } catch(err) {  
      alert("An error occured while fetching categories list",err);
      // console.log(err.response);
      console.log(err.response.data);
    }
}

  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const {totalItems} = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  return (
    <div className='h-16 border-b-[1px] text-richblack-50 border-richblack-700
    flex items-center justify-center transition-all duration-200
    '>
        <div className='w-11/12 max-w-maxContent flex justify-between items-center'>
            <Link to={"/"} onClick={()=>{dispatch(setTotalItems(5)); dispatch(setToken(1333)); dispatch(setUser(userData))}} >
              <img src={Logo} alt='logo' width={160} loading='lazy' />
            </Link>

            {/* navlinks */}
            <div className='lg:flex gap-7 hidden'>
              {
                NavbarLinks.map((item, index)=> {
                    if(item.title !== "Catalog") {
                      return (
                      <Link key={index} to={item.path} className={`${matchRoute(item.path)? "text-yellow-25":"text-richblack-50"}`}>
                        {item.title}
                      </Link>
                    )}
                    else {
                      return (
                          <div key={index} className='flex relative group cursor-pointer items-center gap-2 '>
                            {item.title}
                            <FaChevronDown/>

                            <div className="invisible transition-all duration-200 opacity-0 group-hover:visible group-hover:opacity-[100%] absolute w-[280px] flex flex-col items-center top-10 left-[50%] -translate-x-[50%] z-50 rounded-lg bg-richblack-25 text-richblack-800 p-4">
                            {
                              subLinks.map((link, index) => {
                                return <Link to={"/"} key={index} className={"w-full"}>
                                  <div className="w-full flex z-50 hover:bg-richblack-100 px-6 py-3 rounded-lg">
                                    {link.name}
                                  </div>
                                </Link>
                              })
                            }

                            <div className="absolute -top-3 left-[50%] rotate-45 -translate-x-[50%] w-6 h-6 bg-richblack-25"></div>
                          </div>
                          
                        </div>
                      )
                    }
                })
              }
            </div>

            {/* login/signup/dashboard */}
            <div className='flex items-center gap-3'>
              {
                token === null && (
                  <div>
                    <div className='lg:flex gap-5 hidden justify-center items-center'>
                      <Link to={"/login"}>
                        <button className='bg-richblack-800 px-4 py-2 rounded-lg border-[1px] border-richblack-600 hover:bg-richblack-900'>
                          Log in
                        </button>
                      </Link>

                      <Link to={"/signup"}>
                        <button className='bg-richblack-800 px-4 py-2 rounded-lg border-[1px] border-richblack-600 hover:bg-richblack-900'>
                          Sign up
                        </button>
                      </Link>
                    </div>

                    <div className='lg:hidden text-2xl cursor-pointer'>
                        <GiHamburgerMenu />
                    </div>
                  </div>
                )
              }
              {
                user && (
                  <button className="text-richblack-50 text-xl cursor-pointer">
                    <FaSearch/>
                  </button>
                )
              }
              {
                user && user?.accountType !== "Instuctor" && (
                  <Link to={"/dashboard/cart"} className="relative rounded-full">
                    <AiOutlineShoppingCart className={"text-3xl text-richblack-50"}/>

                    {
                      totalItems > 0 && (
                        <div className="absolute font-semibold text-sm -top-1 -right-[4px] flex justify-center items-center w-[21px] h-[21px] p-2 rounded-full bg-white text-caribbeangreen-400 animate-bounce">
                          {totalItems}
                        </div>
                      )
                    }
                  </Link>
                ) 
              }

              {
                user && (
                  <ProfileDropDown user={user}/>
                )
              }

              
            </div>
        </div>
    </div>
  )
}

export default Navbar;