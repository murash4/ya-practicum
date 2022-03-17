import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const ResetPasswordPage = () => {
  const [passwordValue, setPasswordValue] = React.useState('')
  const [typePassword, setTypePassword] = React.useState('password')
  const [codeValue, setCodeValue] = React.useState('')
  const passwordRef = useRef(null)
  const codeRef = useRef(null)

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
        Восстановление пароля
      </p>
      <div className="mb-6">
        <Input
          type={typePassword}
          placeholder="Введите новый пароль"
          ref={passwordRef}
          value={passwordValue}
          name="email"
          size="default"
          icon={typePassword === 'password' ? 'ShowIcon' : 'HideIcon'}
          onIconClick={changeTypePassword}
          onChange={e => setPasswordValue(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Введите код из письма"
          ref={codeRef}
          value={codeValue}
          name="email"
          size="default"
          onChange={e => setCodeValue(e.target.value)}
        />
      </div>
      <div className="mb-20">
        <Button
          type="primary"
          size="large"
        >
          Сохранить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль? <NavLink to="/login">Войти</NavLink>
      </p>
    </form>
  </div>
}

export default ResetPasswordPage
