import React, { SyntheticEvent, useCallback, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from '../../services/store'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { editUser } from '../../services/actions/user'

export default function ProfileForm () {
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
  const toggleEdit = (type: string): void => {
    switch (type) {
      case 'name': {
        setNameDisabled(!nameDisabled)
        break
      }
      case 'email': {
        setEmailDisabled(!emailDisabled)
        break
      }
      case 'password': {
        setPasswordDisabled(!passwordDisabled)
        break
      }
      default:
        break
    }
  }

  /**
   * Сброс измененных данных пользователя
   */
  const resetUser = useCallback(() => {
    setNameValue(user?.data?.name || '')
    setEmailValue(user?.data?.email || '')
    setNameDisabled(true)
    setEmailDisabled(true)
    setPasswordDisabled(true)
  }, [user])

  /**
   * Обработчик кнопки для сброса изменений формы
   * @param {object} e
   */
  const resetUserHandler = useCallback(
    e => {
      if (e) {
        e.preventDefault()
      }

      resetUser()
    }, [resetUser]
  )

  /**
   * Сохранение данных пользователя
   * @param {object} e
   */
  const saveUser = (e: SyntheticEvent): void => {
    e.preventDefault()

    dispatch(editUser({
      email: emailValue,
      name: nameValue,
      password: passwordValue
    }))
  }

  /**
   * Флаг, что форма была изменена
   */
  const isFormChanged = nameValue !== user?.data?.name ||
    emailValue !== user?.data?.email

  useEffect(() => {
    resetUser()
  }, [resetUser])

  return (
    <form
      className="profile__form"
      onSubmit={saveUser}
    >
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
          name="password"
          size="default"
          icon="EditIcon"
          disabled={passwordDisabled}
          onIconClick={() => toggleEdit('password')}
          onChange={e => setPasswordValue(e.target.value)}
        />
      </div>
      <div className="profile__form-btns">
        <Button
          type="primary"
          size="large"
          disabled={!isFormChanged}
          onClick={resetUserHandler}
        >
          Отмена
        </Button>
        <Button
          type="primary"
          size="large"
          disabled={user.isLoading || !isFormChanged}
        >
          Сохранить
        </Button>
      </div>
    </form>
  )
}
