import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import CheckSignUpData from "./components/core/Auth/CheckSignUpData";
import UpdatePassword from "./pages/UpdatePassword";
import Error from "./pages/Error";
import Contact from "./pages/Contact";
import About from "./pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/core/Dashboard/Cart";
import AddCourse from "./components/core/Dashboard/AddCourse";
import { useEffect } from "react";
import { getUserDetails } from "./services/operations/profileAPI";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/Instructor";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";

function App() {
  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     const token = JSON.parse(localStorage.getItem("token"));
  //     dispatch(getUserDetails(token, navigate));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }>
            <Route path="my-profile" element={<MyProfile /> } />
            <Route path="settings" element={<Settings /> } />
            {
              (user?.accountType === ACCOUNT_TYPE.STUDENT) && (
                <>
                  <Route path="enrolled-courses" element={<EnrolledCourses /> } />
                  <Route path="cart" element={<Cart />} />
                </>
              )
            }
            {
              (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) && (
                <>
                  <Route path="add-course" element={<AddCourse /> } />
                  <Route path="instructor" element={<Instructor />} />
                  <Route path="my-courses" element={<MyCourses />} />
                  <Route
                    path="edit-course/:courseId"
                    element={<EditCourse />}
                  />
                </>
              )
            }
        </Route>

        {/* For the watching course lectures */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

        <Route path="/verify-email" element={
          <CheckSignUpData>
            <VerifyEmail/>
          </CheckSignUpData>
        } />

        <Route path={`/reset-password/:token`} element={<UpdatePassword/>} />

        <Route path="*" element={<Error/>} />
      </Routes>
    </div>
  );
}

export default App;
