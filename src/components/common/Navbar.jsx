import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import NavCart from "./NavCart";
import { toast } from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../utils/constants";

const Navbar = () => {
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const [subLinks, setSubLinks] = useState([]);

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const fetchSubLinks = async () => {
    try {
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      // console.log(response.data.data);
      setSubLinks(response.data.data);
    } catch (err) {
      toast.error("An error occured while fetching categories list");
      // console.log(err.response);
      // console.log(err.response.data);
    }
  };

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  return (
    <div
      className="h-16 border-b-[1px] text-richblack-50 border-richblack-700
    flex items-center justify-center transition-all duration-200 bg-richblack-800
    "
    >
      <div className="w-11/12 max-w-maxContent flex justify-between items-center transition-all duration-200">
        <Link to={"/"}>
          <img src={Logo} alt="logo" width={160} loading="lazy" />
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <FaChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login/signup/dashboard */}
        <div className="flex items-center gap-3 transition-all duration-200">
          {token === null && (
            <div>
              <div className="lg:flex gap-5 hidden justify-center items-center">
                <Link to={"/login"}>
                  <button className="bg-richblack-800 px-4 py-2 rounded-lg border-[1px] border-richblack-600 hover:bg-richblack-900">
                    Log in
                  </button>
                </Link>

                <Link to={"/signup"}>
                  <button className="bg-richblack-800 px-4 py-2 rounded-lg border-[1px] border-richblack-600 hover:bg-richblack-900">
                    Sign up
                  </button>
                </Link>
              </div>

              <div
                onClick={() => setOpen(!open)}
                className="lg:hidden text-2xl relative cursor-pointer transition-all duration-200"
              >
                <GiHamburgerMenu />

                {open && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    ref={ref}
                    className="text-lg p-3 absolute top-10 right-0 z-10 bg-richblack-900 border border-richblack-600 rounded-lg flex flex-col gap-2 justify-center min-w-fit w-[130px]"
                  >
                    {NavbarLinks.map((item, index) => {
                      if (item.title !== "Catalog") {
                        return (
                          <Link
                            key={index}
                            to={item.path}
                            className={`${
                              matchRoute(item.path)
                                ? "text-yellow-25"
                                : "text-richblack-50"
                            }`}
                          >
                            {item.title}
                          </Link>
                        );
                      } else {
                        return (
                          <div
                            key={index}
                            className="transition-all duration-200"
                          >
                            <div
                              onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                              className="flex relative group cursor-pointer items-center gap-2 "
                            >
                              {item.title}
                              <FaChevronDown />
                            </div>

                            {isCatalogOpen && (
                              <ul className="transition-all duration-200 ">
                                {loading ? (
                                  <p className="text-center">Loading...</p>
                                ) : subLinks.length ? (
                                  <>
                                    {subLinks
                                      ?.filter(
                                        (subLink) =>
                                          subLink?.courses?.length > 0
                                      )
                                      ?.map((subLink, i) => (
                                        <li className="pt-1 pl-2">
                                          <Link
                                            to={`/catalog/${subLink.name
                                              .split(" ")
                                              .join("-")
                                              .toLowerCase()}`}
                                            className="rounded-lg bg-transparent hover:bg-richblack-50"
                                            key={i}
                                          >
                                            <p>{subLink.name}</p>
                                          </Link>
                                        </li>
                                      ))}
                                  </>
                                ) : (
                                  <p className="text-center">
                                    No Courses Found
                                  </p>
                                )}
                              </ul>
                            )}
                          </div>
                        );
                      }
                    })}
                    <Link
                      to="/login"
                      className={`${
                        matchRoute("/login")
                          ? "text-yellow-25"
                          : "text-richblack-50"
                      }`}
                    >
                      Login
                    </Link>

                    <Link
                      to="/signup"
                      className={`${
                        matchRoute("/signup")
                          ? "text-yellow-25"
                          : "text-richblack-50"
                      }`}
                    >
                      Singup
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
          {token && user && (
            <button className="text-richblack-50 text-xl cursor-pointer">
              <FaSearch />
            </button>
          )}
          {token && user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <NavCart />
          )}

          {token && user && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
