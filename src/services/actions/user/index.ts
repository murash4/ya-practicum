import {
  SET_USER_LOADING,
  SET_USER_DATA,
  SET_USER_DATA_ERROR,
  SET_USER_MESSAGE,
  CLEAR_USER_DATA,
  TUserActions,
  IUserData
} from './constants'
import { IUserState } from '../../reducers/user'
import { apiUrl, authUrl } from '../../../utils/api'
import { cookie } from '../../../utils/cookie'
import { checkResponse } from '../../../helpers/api'
import { ThunkAction } from 'redux-thunk'
import { TDispatchWithThunk } from '../../store'

interface ITokens {
  accessToken: string,
  refreshToken: string
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IUserState,
  unknown,
  TUserActions
>

/**
 * Обновление токена
 */
export const updateToken = (callback: Function): AppThunk<Promise<void>> => {
  return async (dispatch: TDispatchWithThunk) => {
    dispatch({
      type: SET_USER_LOADING,
      value: true
    })

    const data = { token: cookie.get('refreshToken') }

    try {
      // Делаем запрос на обновление токена
      const parsedData = await fetch(`${authUrl}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => checkResponse<ITokens>(res))
      const cookieTime = Date.now() + 20 * 60 * 1000
      const accessToken = parsedData.accessToken.split('Bearer ')[1]

      cookie.set('token', accessToken, { expires: new Date(cookieTime) })
      cookie.set('refreshToken', parsedData.refreshToken)
    } catch (e) {
      console.log('Ошибка запроса к api: ', e)
    } finally {
      dispatch({
        type: SET_USER_LOADING,
        value: false
      })

      if (callback) {
        dispatch(callback())
      }
    }
  }
}

/**
 * Получение информации о пользователе
 * @returns {Promise}
 */
export function getUser (): AppThunk<Promise<void>> {
  return async dispatch => {
    let isJwtMalformed = false
    dispatch({
      type: SET_USER_LOADING,
      value: true
    })

    try {
      // Делаем запрос на получение данных о пользователе
      const parsedData = await fetch(`${authUrl}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.get('token')}`
        }
      })
        .then(async result => {
          let err = null
          if (!result.ok) {
            err = 'статус не \'ok\''
          }
          const res = await result.json()

          // Если есть сообщение с ошибкой о истекшем токене
          if (res.message === 'jwt malformed' && cookie.get('refreshToken')) {
            isJwtMalformed = true
          }

          // Если ошибка не связана с истекшим токеном, то выкидываем ее
          if (err) {
            throw new Error(err)
          }

          // Иначе возвращаем результат
          return res
        })

      // Если сообщение с ошибкой, но токен не нужно обновлять
      if (parsedData.message) {
        throw new Error(parsedData.message)
      }

      // Если все хорошо, то сохраняем данные пользователя
      dispatch({
        type: SET_USER_DATA,
        data: parsedData.user
      })
    } catch (e) {
      console.log('Ошибка запроса к api: ', e)
      dispatch({
        type: SET_USER_DATA_ERROR
      })
    } finally {
      dispatch({
        type: SET_USER_LOADING,
        value: false
      })

      if (isJwtMalformed) {
        dispatch(updateToken(getUser))
      }
    }
  }
}

interface IEditUserData {
  email: string,
  name: string,
  password: string
}

interface IEditUserFetchData {
  message: string,
  user: IUserData
}

/**
 * Обновление информации о пользователе
 * @returns {Promise}
 */
export function editUser (data: IEditUserData): AppThunk<Promise<void>> {
  return async dispatch => {
    dispatch({
      type: SET_USER_LOADING,
      value: true
    })

    try {
      // Делаем запрос на получение данных о пользователе
      const parsedData = await fetch(`${authUrl}/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.get('token')}`
        },
        body: JSON.stringify(data)
      })
        .then(res => checkResponse<IEditUserFetchData>(res))

      // Если есть сообщение с ошибкой о истекшем токене
      if (parsedData.message === 'jwt malformed' && cookie.get('refreshToken')) {
        dispatch(updateToken)
        return
      }

      // Если сообщение с ошибкой, но токен не нужно обновлять
      if (parsedData.message) {
        throw new Error(parsedData.message)
      }

      // Если все хорошо, то сохраняем данные пользователя
      dispatch({
        type: SET_USER_DATA,
        data: parsedData.user
      })
    } catch (e) {
      console.log('Ошибка запроса к api: ', e)
      dispatch({
        type: SET_USER_DATA_ERROR
      })
    } finally {
      dispatch({
        type: SET_USER_LOADING,
        value: false
      })
    }
  }
}

interface ISignInFetch {
  accessToken: string
  refreshToken: string
  user: IUserData
}

interface ISignInData {
  email: string,
  password: string
}

/**
 * Авторизация
 * @param {object} data
 */
export function signIn (data: ISignInData): AppThunk<Promise<void>> {
  return async dispatch => {
    dispatch({
      type: SET_USER_LOADING,
      value: true
    })

    try {
      // Делаем запрос на авторизацию пользователя
      const parsedData = await fetch(`${authUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => checkResponse<ISignInFetch>(res))
      const accessToken = parsedData.accessToken.split('Bearer ')[1]
      const cookieTime = Date.now() + 20 * 60 * 1000

      cookie.set('token', accessToken, { expires: new Date(cookieTime) })
      cookie.set('refreshToken', parsedData.refreshToken)

      dispatch({
        type: SET_USER_DATA,
        data: parsedData.user
      })
    } catch (e) {
      console.log('Ошибка запроса к api: ', e)
      dispatch({
        type: SET_USER_DATA_ERROR
      })
    } finally {
      dispatch({
        type: SET_USER_LOADING,
        value: false
      })
    }
  }
}

interface ISignUpData {
  email: string,
  password: string,
  name: string
}

/**
 * Регистрация
 * @param {object} data
 */
export function signUp (data: ISignUpData): AppThunk<Promise<void>> {
  return async dispatch => {
    dispatch({
      type: SET_USER_LOADING,
      value: true
    })

    try {
      // Делаем запрос на регистрацию пользователя
      const parsedData = await fetch(`${authUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => checkResponse<ISignInFetch>(res))
      const accessToken = parsedData.accessToken.split('Bearer ')[1];
      const cookieTime = Date.now() + 20 * 60 * 1000

      cookie.set('token', accessToken, { expires: new Date(cookieTime) })
      cookie.set('refreshToken', parsedData.refreshToken)

      dispatch({
        type: SET_USER_DATA,
        data: parsedData.user
      })
    } catch (e) {
      console.log('Ошибка запроса к api: ', e)
      dispatch({
        type: SET_USER_DATA_ERROR
      })
    } finally {
      dispatch({
        type: SET_USER_LOADING,
        value: false
      })
    }
  }
}

interface IResetPasswordFetch {
  message: string,
  success: boolean
}

interface IResetPasswordData {
  email: string
}

/**
 * Сброс пароля
 * @param {object} data
 */
export function resetPassword (data: IResetPasswordData): AppThunk<Promise<void>> {
  return async dispatch => {
    dispatch({
      type: SET_USER_LOADING,
      value: true
    })

    try {
      // Делаем запрос на сброс пароля
      const parsedData = await fetch(`${apiUrl}password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => checkResponse<IResetPasswordFetch>(res))

      if (parsedData.success && parsedData.message === 'Reset email sent') {
        dispatch({
          type: SET_USER_MESSAGE,
          data: parsedData.message
        })
      } else {
        throw new Error(parsedData.message)
      }
    } catch (e) {
      console.log('Ошибка запроса к api: ', e)
      dispatch({
        type: SET_USER_DATA_ERROR
      })
    } finally {
      dispatch({
        type: SET_USER_LOADING,
        value: false
      })
    }
  }
}

interface IChangePasswordData {
  password: string,
  token: string
}

/**
 * Установка нового пароля
 * @param {object} data
 */
export function changePassword (data: IChangePasswordData): AppThunk<Promise<void>> {
  return async dispatch => {
    dispatch({
      type: SET_USER_LOADING,
      value: true
    })

    // Делаем запрос на смену пароля
    try {
      const parsedData = await fetch(`${apiUrl}password-reset/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => checkResponse<IResetPasswordFetch>(res))

      if (parsedData.success && parsedData.message === 'Password successfully reset') {
        dispatch({
          type: SET_USER_MESSAGE,
          data: parsedData.message
        })
      } else {
        throw new Error(parsedData.message)
      }
    } catch (e) {
      console.log('Ошибка запроса к api: ', e)
      dispatch({
        type: SET_USER_DATA_ERROR
      })
    } finally {
      dispatch({
        type: SET_USER_LOADING,
        value: false
      })
    }
  }
}

/**
 * Выход из аккаунта
 */
export function logOut (): AppThunk<Promise<void>> {
  return async dispatch => {
    dispatch({
      type: SET_USER_LOADING,
      value: true
    })

    // Делаем запрос на выход из аккаунта
    try {
      const data = { token: cookie.get('refreshToken') }
      const parsedData = await fetch(`${authUrl}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => checkResponse<IResetPasswordFetch>(res))

      if (parsedData.success && parsedData.message === 'Successful logout') {
        cookie.remove('token')
        cookie.remove('refreshToken')
        dispatch({
          type: CLEAR_USER_DATA
        })
      } else {
        throw new Error(parsedData.message)
      }
    } catch (e) {
      console.log('Ошибка запроса к api: ', e)
      dispatch({
        type: SET_USER_DATA_ERROR
      })
    } finally {
      dispatch({
        type: SET_USER_LOADING,
        value: false
      })
    }
  }
}
