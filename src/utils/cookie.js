import jsCookie from 'js-cookie'

/**
 * Обёртка над js-cookie для expires по умолчанию
 */
export const cookie = {
  set (...args) {
    // установка expires по умолчанию
    args[2] = { expires: 9999, ...args[2] }

    return jsCookie.set(...args)
  },
  get (name) {
    return jsCookie.get(name)
  },
  getJSON (...args) {
    return jsCookie.getJSON(...args)
  },
  remove (...args) {
    jsCookie.remove(...args)
  }
}
