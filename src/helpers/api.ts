/**
 * Проверка ответа от сервера
 * @param {object} result
 * @return {Error|Promise}
 */

type TCheckResponse = {
  ok?: boolean
  json: () => any
}

export const checkResponse = async <R>(result: TCheckResponse): Promise<R> => {
  if (!result.ok) {
    throw new Error('статус не \'ok\'')
  }

  return await result.json()
}
