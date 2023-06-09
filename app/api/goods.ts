import { createEffect } from 'effector-next'
import api from '../axiosClient'
import { toast } from 'react-toastify'

export const getBestsellersOrNewGoodsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const getGoodsFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const getGoodFx = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

//*Поиск по строчке
export const searchGoodsFx = createEffect(
  async ({ url, search }: { url: string; search: string }) => {
    const { data } = await api.post(url, { search })

    return data.rows
  }
)

//* Поиск по имени
export const getGoodByNameFx = createEffect(
  async ({ url, name }: { url: string; name: string }) => {
    try {
      const { data } = await api.post(url, { name })

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
