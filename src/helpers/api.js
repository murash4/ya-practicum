/**
 * Проверка ответа от сервера
 * @param {object} result
 * @return {Error|Promise}
 */
export const checkResponse = async result => {
  if (!result.ok) {
    throw new Error('статус не \'ok\'')
  }

  return await result.json()
}
