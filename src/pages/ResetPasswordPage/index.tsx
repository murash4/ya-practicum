import React, { useCallback, useRef } from 'react'
import { TLocation, TTypePassword } from '../../utils/types'
import { NavLink, Redirect, useLocation } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../services/actions/user'

const ResetPasswordPage = () => {
  // @ts-ignore
  const user = useSelector(state => state.user)
  const [passwordValue, setPasswordValue] = React.useState('')
  const [typePassword, setTypePassword] = React.useState<TTypePassword>('password')
  const [tokenValue, setTokenValue] = React.useState('')
  const passwordRef = useRef(null)
  const tokenRef = useRef(null)
  const dispatch = useDispatch()
  const location = useLocation<TLocation>()
  const responseMessage = user.responseMessage

  /**
   * Отправляем данные для авторизации
   */
  const submitForm = useCallback((e) => {
    e.preventDefault()
    dispatch(changePassword({
      password: passwordValue,
      token: tokenValue
    }))
  }, [dispatch, passwordValue, tokenValue])

  // если пользователь не отправлял email для восстановления пароля
  if (
    responseMessage !== 'Reset email sent' ||
    user.responseMessage === 'Password successfully reset'
  ) {
    return (
      // @ts-ignore
      <Redirect to={ location.state?.from || '/' } />
    )
  }

  /**
   * Переключает видимость введенного пароля
   */
  const changeTypePassword = () => {
    const newType = typePassword === 'password' ? 'text' : 'password'

    setTypePassword(newType)
  }

  return (
    <div className="form--wr-center">
      <form
        className="form"
        onSubmit={submitForm}
      >
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
            ref={tokenRef}
            value={tokenValue}
            name="token"
            size="default"
            onChange={e => setTokenValue(e.target.value)}
          />
        </div>
        <div className="mb-20">
          <Button
            type="primary"
            size="large"
            disabled={!passwordValue || !tokenValue}
          >
            Сохранить
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль? <NavLink to="/login">Войти</NavLink>
        </p>
      </form>
    </div>
  )
}

export default ResetPasswordPage
