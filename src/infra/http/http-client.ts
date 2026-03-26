import { string } from 'zod'

const API_URL = import.meta.env.VITE_API_URL

export const http = {
  get: async <ResponseType>(
    endPoint: string,
    searchParams?: Array<{ key: string; value: string }>,
  ): Promise<ResponseType> => {
    const finalUrl = buildUrl(endPoint, searchParams)
    const reponse = await fetch(finalUrl)
    if (reponse.ok) {
      return (await reponse.json()) as ResponseType
    }

    throw new Error('Erro ao buscar dados.')
  },
  post: async <ResponseType>(
    endPoint: string,
    body: any,
  ): Promise<ResponseType> => {
    const finalUrl = buildUrl(endPoint)
    const reponse = await fetch(finalUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (reponse.ok) {
      return (await reponse.json()) as ResponseType
    }

    throw new Error('Erro ao enviar dados.')
  },
}

function buildUrl(
  endPoint: string,
  searchParams?: Array<{ key: string; value: string }>,
) {
  const finalUrl = new URL(`${API_URL}/${endPoint}`)

  if (searchParams) {
    searchParams.forEach((param) =>
      finalUrl.searchParams.append(param.key, param.value),
    )
  }

  return finalUrl.toString()
}
