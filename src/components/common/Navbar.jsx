import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom';
import {GiHamburgerMenu} from "react-icons/gi";
import {FaChevronDown, FaSearch} from "react-icons/fa";
import {NavbarLinks} from "../../data/navbar-links";
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { useRef } from 'react';
import useOnClickOutside from "../../hooks/useOnClickOutside";
import NavCart from "./NavCart";
import {toast} from "react-hot-toast";

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
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      // console.log(response.data.data);
      setSubLinks(response.data.data);

    } catch(err) {  
      toast.error("An error occured while fetching categories list");
      // console.log(err.response);
      // console.log(err.response.data);
    }
  }

  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);

  const [open, setOpen] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, ()=> setOpen(false));

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  

  return (
    <div className='h-16 border-b-[1px] text-richblack-50 border-richblack-700
    flex items-center justify-center transition-all duration-200
    '>
        <div className='w-11/12 max-w-maxContent flex justify-between items-center transition-all duration-200'>
            <Link to={"/"}>
              <img src={Logo} alt='logo' width={160} loading='lazy' />
            </Link>

            {/* navlinks */}
            <div className='lg:flex gap-7 hidden transition-all duration-200'>
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
                          <div key={index} className='flex relative group cursor-pointer items-center gap-2 transition-all duration-200'>
                            {item.title}
                            <FaChevronDown/>

                            <div className="invisible transition-all duration-200 opacity-0 group-hover:visible group-hover:opacity-[100%] absolute w-[280px] flex flex-col items-center top-10 left-[59%] -translate-x-[41%] z-50 rounded-lg bg-richblack-25 text-richblack-800 p-4">
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
            <div className='flex items-center gap-3 transition-all duration-200'>
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

                    <div 
                    onClick={() => setOpen(!open)}
                    className='lg:hidden text-2xl relative cursor-pointer transition-all duration-200'>
                        <GiHamburgerMenu />

                        {
                          open && 
                          <div 
                          onClick={(e) => e.stopPropagation()}
                          ref={ref}
                          className='text-lg p-3 absolute top-10 right-0 z-10 bg-richblack-900 border border-richblack-600 rounded-lg flex flex-col gap-2 justify-center min-w-fit w-[130px]'>
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
                                        <div key={index} className="transition-all duration-200">
                                        <div 
                                        onClick={()=>setIsCatalogOpen(!isCatalogOpen)}
                                        className='flex relative group cursor-pointer items-center gap-2 '>
                                          {item.title}
                                          <FaChevronDown/>                                          
                                        </div>

                                        {isCatalogOpen && 
                                          <ul className="transition-all duration-200 ">
                                            {
                                              subLinks.map((link, index) => {
                                                return <Link to={"/"} key={index} className={"w-full"}>
                                                  <li className="w-full flex z-50 hover:bg-richblack-600 rounded-lg p-2 pb-1 ml-3">
                                                    {link.name}
                                                  </li>
                                                </Link>
                                              })
                                            }
                                          </ul>}
                                        </div>
                                    )
                                  }
                              })
                            }
                            <Link to="/login" className={`${matchRoute('/login')? "text-yellow-25":"text-richblack-50"}`}>
                              Login
                            </Link>

                            <Link to="/signup" className={`${matchRoute('/signup')? "text-yellow-25":"text-richblack-50"}`}>
                              Singup
                            </Link>
                          </div>
                        }
                    </div>
                  </div>
                )
              }
              {
                token && user && (
                  <button className="text-richblack-50 text-xl cursor-pointer">
                    <FaSearch/>
                  </button>
                )
              }
              {
                token && user && user?.accountType !== "Instuctor" && (
                  <NavCart />
                ) 
              }

              {
                token && user && (
                  <ProfileDropDown />
                )
              }
              
            </div>
        </div>
    </div>
  )
}

export default Navbar;