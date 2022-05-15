import React, {useRef, useCallback, useEffect} from 'react'
import { useSelector, useDispatch } from '../../services/store'
import { NavLink, Redirect, useLocation } from 'react-router-dom'
import { TLocation, TTypePassword } from '../../utils/types'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { getUser, signUp } from '../../services/actions/user'
import Preloader from '../../components/preloader'

const RegisterPage = () => {
  const user = useSelector(state => state.user)
  const [nameValue, setNameValue] = React.useState('')
  const [emailValue, setEmailValue] = React.useState('')
  const [passwordValue, setPasswordValue] = React.useState('')
  const [typePassword, setTypePassword] = React.useState<TTypePassword>('password')
  const nameRef = useRef<HTMLInputElement>(null)
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
   * Отправляем данные для регистрации
   */
  const submitForm = useCallback((e) => {
    e.preventDefault()
    dispatch(signUp({
      email: emailValue,
      password: passwordValue,
      name: nameValue
    }))
  }, [dispatch, emailValue, passwordValue, nameValue])

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
            disabled={!nameValue || !emailValue || !passwordValue}
          >
            Зарегистрироваться
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Уже зарегистрированы? <NavLink to="/login">Войти</NavLink>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
