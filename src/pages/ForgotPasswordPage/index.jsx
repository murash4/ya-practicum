import React, { useCallback, useEffect, useRef } from 'react'
import {NavLink, Redirect, useLocation} from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import { getUser, resetPassword } from '../../services/actions/user'
import Preloader from '../../components/preloader'

const ForgotPasswordPage = () => {
  const user = useSelector(state => state.user)
  const [emailValue, setEmailValue] = React.useState('')
  const emailRef = useRef(null)
  const dispatch = useDispatch()
  const location = useLocation()

  // если есть токен, но зашли по прямой ссылке, то запрашиваем данные по пользователю
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  /**
   * Отправляем данные для авторизации
   */
  const submitForm = useCallback((e) => {
    e.preventDefault()
    dispatch(resetPassword({
      email: emailValue
    }))
  }, [dispatch, emailValue])

  // Пока идет загрузка, то показываем лоадер
  if (user.isLoading) {
    return <Preloader fullPage={true} />
  }

  // если пользователь существует, то уходит со страницы
  if (user.data) {
    return (
      <Redirect to={ location.state?.from || '/' } />
    )
  }

  if (user.responseMessage === 'Reset email sent') {
    return (
      <Redirect to='/reset-password' />
    )
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
            disabled={!emailValue}
          >
            Восстановить
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль? <NavLink to="/login">Войти</NavLink>
        </p>
      </form>
    </div>
  )
}

export default ForgotPasswordPage
