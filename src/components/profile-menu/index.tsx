import React, {FC} from 'react'
import { useDispatch } from '../../services/store'
import { NavLink } from 'react-router-dom'
import { logOut } from '../../services/actions/user'

interface IProfileMenu {
  text: string
}

const ProfileMenu: FC<IProfileMenu> = ({ text }) => {
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
        {text}
      </p>
    </div>
  )
}

export default ProfileMenu
