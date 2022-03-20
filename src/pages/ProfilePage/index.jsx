import React from 'react'
import ProfileMenu from '../../components/profile-menu'
import ProfileForm from '../../components/profile-form'
import './style.css'

const ProfilePage = () => {
  return (
    <div className="profile">
      <ProfileMenu />
      <ProfileForm />
    </div>
  )
}

export default ProfilePage
