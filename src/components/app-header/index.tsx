import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo
} from '@ya.praktikum/react-developer-burger-ui-components'
import Btn from '../btn'
import { NavLink } from 'react-router-dom'
import './style.css'

export default function AppHeader () {
  return (
    <header className="header pt-4 pb-4">
      <nav className="header__inner">
        <div>
          <NavLink
            to="/"
            className="header__button"
            exact={true}
          >
            <Btn
              icon={<BurgerIcon type="secondary" />}
              text="Конструктор"
              color="secondary"
            />
          </NavLink>
          <NavLink
            to="/feed"
            className="header__button"
            exact={true}
          >
            <Btn
              icon={<ListIcon type="secondary" />}
              text="Лента заказов"
              color="secondary"
            />
          </NavLink>
        </div>

        <NavLink
          to="/"
          className="header__logo-wr ml-2 mr-2"
        >
          <Logo />
        </NavLink>

        <NavLink
          to="/profile"
          className="header__button"
        >
          <Btn
            icon={<ProfileIcon type="secondary" />}
            text="Личный кабинет"
            color="secondary"
          />
        </NavLink>
      </nav>
    </header>
  )
}
