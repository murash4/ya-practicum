import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const RegisterPage = () => {
  const [nameValue, setNameValue] = React.useState('')
  const [emailValue, setEmailValue] = React.useState('')
  const [passwordValue, setPasswordValue] = React.useState('')
  const [typePassword, setTypePassword] = React.useState('password')
  const nameRef = useRef(null)
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
        Регистрация
      </p>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Имя"
          ref={nameRef}
          value={nameValue}
          name="name"
          size="default"
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
          Зарегистрироваться
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Уже зарегистрированы? <NavLink to="/login">Войти</NavLink>
      </p>
    </form>
  </div>
}

export default RegisterPage
