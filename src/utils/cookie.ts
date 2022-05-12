import jsCookie from 'js-cookie'

type TSet = [
  string,
  any,
  {
    expires: Date
  }?
]

/**
 * Обёртка над js-cookie для expires по умолчанию
 */
export const cookie = {
  set (...args: TSet) {
    // установка expires по умолчанию
    args[2] = { expires: new Date(9999999999999), ...args[2] }

    return jsCookie.set(...args)
  },
  get (name: string) {
    return jsCookie.get(name)
  },
  remove (...args: [string]) {
    jsCookie.remove(...args)
  }
}
