import "./App.css";
import { Route, Routes } from "react-router-dom";
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

function App() {

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

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }>
            <Route path="my-profile" element={<MyProfile /> } />
            <Route path="settings" element={<Settings /> } />
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
