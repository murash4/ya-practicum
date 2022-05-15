import React from 'react'
import ProfileMenu from '../../components/profile-menu'
import ProfileForm from '../../components/profile-form'
import './style.css'

const ProfilePage = () => {
  const menuText = 'В этом разделе вы можете изменить свои персональные данные'

  return (
    <div className="profile">
      <ProfileMenu text={menuText} />
      <ProfileForm />
    </div>
  )
}

export default ProfilePage
