import React from 'react';
import ChangeProfilePic from './ChangeProfilePic';
import EditProfile from './EditProfile';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';

const Settings = () => {

  return (
    <>
      <h1 className='text-richblack-5 text-4xl mb-10'
      >Edit Profile</h1>
      <div className='flex flex-col gap-10'>
        {/* change profile */}
        <ChangeProfilePic />

        {/* profile info */}
        <EditProfile />

        {/* update password */}
        <UpdatePassword />

        {/* delete account */}
        <DeleteAccount />
      </div>
  </>
  )
}

export default Settings