import {
  SET_USER_LOADING,
  SET_USER_DATA,
  SET_USER_DATA_ERROR,
  SET_USER_MESSAGE,
  CLEAR_USER_DATA
} from './constants'
import { apiUrl, authUrl } from '../../../utils/api'
import { cookie } from '../../../utils/cookie'

/**
 * Обновление токена
 */
export const updateToken = () => {
  return async dispatch => {
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
        .then(res => res.json())

      const cookieTime = Date.now() + 20 * 60 * 1000
      const accessToken = parsedData.accessToken.split('Bearer ')[1]

      cookie.set('token', accessToken, {expires: new Date(cookieTime)})
      cookie.set('refreshToken', parsedData.refreshToken)
    } catch (e) {
      console.log('Ошибка запроса к api: ', e)
    } finally {
      dispatch({
        type: SET_USER_LOADING,
        value: false
      })
    }
  }
}

/**
 * Получение информации о пользователе
 * @returns {Promise}
 */
export function getUser () {
  return async dispatch => {
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
        .then(res => res.json())

      // Если есть сообщение с ошибкой о истекшем токене
      if (parsedData.message === 'jwt malformed' && cookie.get('refreshToken')) {
        dispatch(updateToken())
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

/**
 * Обновление информации о пользователе
 * @returns {Promise}
 */
export function editUser () {
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
        }
      })
        .then(res => res.json())

      // Если есть сообщение с ошибкой о истекшем токене
      if (parsedData.message === 'jwt malformed' && cookie.get('refreshToken')) {
        dispatch(updateToken())
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

/**
 * Авторизация
 * @param {object} data
 */
export function signIn (data) {
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
        .then(res => res.json())
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

/**
 * Регистрация
 * @param {object} data
 */
export function signUp (data) {
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
        .then(res => res.json())
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

/**
 * Сброс пароля
 * @param {object} data
 */
export function resetPassword (data) {
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
        .then(res => res.json())

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

/**
 * Установка нового пароля
 * @param {object} data
 */
export function changePassword (data) {
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
        .then(res => res.json())

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
export function logOut () {
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
        .then(res => res.json())

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
