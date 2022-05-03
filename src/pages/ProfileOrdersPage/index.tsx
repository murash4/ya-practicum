import React from 'react'
import SimpleBar from 'simplebar-react'
import ProfileMenu from '../../components/profile-menu'
import OrderFeed from '../../components/order-feed'
import styles from './style.module.css'

const ProfileOrdersPage = () => {
  const menuText = 'В этом разделе вы можете просмотреть свою историю заказов'

  return (
    <div className="profile">
      <ProfileMenu text={menuText} />
      <SimpleBar className={`${styles.simplebar} mt-9`}>
        <div className="pr-4">
          <OrderFeed />
          <OrderFeed />
          <OrderFeed />
        </div>
      </SimpleBar>
    </div>
  )
}

export default ProfileOrdersPage
