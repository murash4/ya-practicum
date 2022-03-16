import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const LoginPage = () => {
  const [emailValue, setEmailValue] = React.useState('')
  const [passwordValue, setPasswordValue] = React.useState('')
  const [typePassword, setTypePassword] = React.useState('password')
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  /**
   * Переключает видимость введенного пароля
   */
  const changeTypePassword = () => {
    const newType = typePassword === 'password' ? 'text' : 'password'

    setTypePassword(newType)
  }

  return <div className="form--wr-center">
    <form className="form">
      <p className="text text_type_main-medium mb-6">
        Вход
      </p>
      <div className="mb-6">
        <Input
          type="email"
          placeholder="E-mail"
          ref={emailRef}
          value={emailValue}
          name="email"
          size="default"
          onChange={e => setEmailValue(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Input
          type={typePassword}
          placeholder="Пароль"
          ref={passwordRef}
          value={passwordValue}
          name="email"
          size="default"
          icon={typePassword === 'password' ? 'ShowIcon' : 'HideIcon'}
          onIconClick={changeTypePassword}
          onChange={e => setPasswordValue(e.target.value)}
        />
      </div>
      <div className="mb-20">
        <Button
          type="primary"
          size="large"
        >
          Войти
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы — новый пользователь? <NavLink to="/register">Зарегистрироваться</NavLink>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <NavLink to="/forgot-password">Восстановить пароль</NavLink>
      </p>
    </form>
  </div>
}

export default LoginPage
