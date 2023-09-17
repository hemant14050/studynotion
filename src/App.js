import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/core/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import CheckSignUpData from "./components/core/CheckSignUpData";
import UpdatePassword from "./pages/UpdatePassword";
import Error from "./pages/Error";

function App() {

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        } />

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
