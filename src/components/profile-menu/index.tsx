import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logOut } from '../../services/actions/user'

export default function ProfileMenu () {
  const dispatch = useDispatch()

  const userLogOut = (): void => {
    dispatch(logOut())
  }

  return (
    <div className="profile__menu-wr mr-15">
      <ul className="profile__menu mb-20">
        <li className="profile__menu-li">
          <NavLink
            to="/profile"
            className="text text_type_main-medium"
            exact={true}
          >Профиль</NavLink>
        </li>
        <li className="profile__menu-li">
          <NavLink
            to="/profile/orders"
            className="text text_type_main-medium"
          >История заказов</NavLink>
        </li>
        <li className="profile__menu-li">
          <div
            className="text text_type_main-medium profile__menu-link"
            onClick={userLogOut}
          >Выход</div>
        </li>
      </ul>
      <p className="text text_type_main-default text_color_inactive">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  )
}
