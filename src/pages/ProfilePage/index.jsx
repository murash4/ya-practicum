import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom'
import { logOut } from '../../services/actions/user'
import './style.css'

const ProfilePage = () => {
  const user = useSelector(state => state.user)
  const [nameValue, setNameValue] = React.useState('')
  const [emailValue, setEmailValue] = React.useState('')
  const [passwordValue, setPasswordValue] = React.useState('')
  const [nameDisabled, setNameDisabled] = React.useState(true)
  const [emailDisabled, setEmailDisabled] = React.useState(true)
  const [passwordDisabled, setPasswordDisabled] = React.useState(true)
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const dispatch = useDispatch()

  /**
   * Переключает возможность редактирования поля
   */
  const toggleEdit = (type) => {
    switch (type) {
      case 'name': {
        return setNameDisabled(!nameDisabled)
      }
      case 'email': {
        return setEmailDisabled(!emailDisabled)
      }
      case 'password': {
        return setPasswordDisabled(!passwordDisabled)
      }
      default:
        break
    }
  }

  const userLogOut = () => {
    dispatch(logOut())
  }

  useEffect(() => {
    setNameValue(user.data.name)
    setEmailValue(user.data.email)
  }, [user])

  return <div className="profile">
    <div className="profile__menu-wr mr-15">
      <ul className="profile__menu mb-20">
        <li className="profile__menu-li">
          <NavLink
            to="/profile"
            className="text text_type_main-medium"
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
    <form className="profile__form">
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Имя"
          ref={nameRef}
          value={nameValue}
          name="name"
          size="default"
          icon="EditIcon"
          disabled={nameDisabled}
          onIconClick={() => toggleEdit('name')}
          onChange={e => setNameValue(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Input
          type="email"
          placeholder="E-mail"
          ref={emailRef}
          value={emailValue}
          name="email"
          size="default"
          icon="EditIcon"
          disabled={emailDisabled}
          onIconClick={() => toggleEdit('email')}
          onChange={e => setEmailValue(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Input
          type="password"
          placeholder="Пароль"
          ref={passwordRef}
          value={passwordValue}
          name="Пароль"
          size="default"
          icon="EditIcon"
          disabled={passwordDisabled}
          onIconClick={() => toggleEdit('password')}
          onChange={e => setPasswordValue(e.target.value)}
        />
      </div>
    </form>
  </div>
}

export default ProfilePage
