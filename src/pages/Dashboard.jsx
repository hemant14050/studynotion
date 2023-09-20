import React from 'react';
import { useSelector } from 'react-redux';
import Loader from "../components/common/Loader";
import { Outlet } from 'react-router-dom';
import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard = () => {
  const {loading: authLoading} = useSelector((state) => state.auth);
  const {loading: profileLoading} = useSelector((state) => state.profile);

  if(authLoading || profileLoading) {
    return (
      <div className='w-11/12 max-w-maxContent mx-auto min-h-[calc(100vh-4.2rem)] flex justify-center items-center'>
        <Loader />
      </div>
    )
  }
  return (
    // w-11/12 max-w-maxContent mx-auto 
    <div className="min-h-[calc(100vh-4.2rem)] flex relative">
      <Sidebar />
      <div className="h-[calc(100vh-4.2rem)] mx-auto w-11/12 max-w-maxContent text-richblack-300 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet/>
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard;