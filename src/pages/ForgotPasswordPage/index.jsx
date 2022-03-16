import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const ForgotPasswordPage = () => {
  const [emailValue, setEmailValue] = React.useState('')
  const emailRef = useRef(null)

  return <div className="form--wr-center">
    <form className="form">
      <p className="text text_type_main-medium mb-6">
        Восстановление пароля
      </p>
      <div className="mb-6">
        <Input
          type="email"
          placeholder="Укажите e-mail"
          ref={emailRef}
          value={emailValue}
          name="email"
          size="default"
          onChange={e => setEmailValue(e.target.value)}
        />
      </div>
      <div className="mb-20">
        <Button
          type="primary"
          size="large"
        >
          Восстановить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль? <NavLink to="/login">Войти</NavLink>
      </p>
    </form>
  </div>
}

export default ForgotPasswordPage
