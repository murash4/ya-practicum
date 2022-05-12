import React, { useCallback, useEffect, useRef } from 'react'
import { NavLink, Redirect, useLocation } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from '../../services/store'
import { TLocation, TTypePassword } from '../../utils/types'
import { getUser, signIn } from '../../services/actions/user'
import Preloader from '../../components/preloader'

const LoginPage = () => {
  const user = useSelector(state => state.user)
  const [emailValue, setEmailValue] = React.useState('')
  const [passwordValue, setPasswordValue] = React.useState('')
  const [typePassword, setTypePassword] = React.useState<TTypePassword>('password')
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const location = useLocation<TLocation>()

  /**
   * Переключает видимость введенного пароля
   */
  const changeTypePassword = () => {
    const newType = typePassword === 'password' ? 'text' : 'password'

    setTypePassword(newType)
  }

  /**
   * Отправляем данные для авторизации
   */
  const submitForm = useCallback((e) => {
    e.preventDefault()
    dispatch(signIn({
      email: emailValue,
      password: passwordValue
    }))
  }, [dispatch, emailValue, passwordValue])

  // если есть токен, но зашли по прямой ссылке, то запрашиваем данные по пользователю
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

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

  return (
    <div className="form--wr-center">
      <form
        className="form"
        onSubmit={submitForm}
      >
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
            disabled={!emailValue || !passwordValue}
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
  )
}

export default LoginPage
