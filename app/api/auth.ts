import { toast } from 'react-toastify'
import { ISignUpFx, ISignInFx } from '@/types/auth'
import { createEffect } from 'effector-next'
import api from '../axiosClient'
import { AxiosError } from 'axios'
import { HTTPStatus } from '@/constans/httpStatuses'
import { error } from 'console'

//!Функции для запроса в БД
export const signUpFx = createEffect(
    async ({ url, username, email, password }: ISignUpFx) => {
        //*Делаем заппрос методом post передадим url и данные
        const { data } = await api.post(url, { username, password, email })

        //*Для ошибок со стороны сервера (такие как "Пользователь уже существует" и т.д)
        if (data.warningMessage) {
            toast.warning(data.warningMessage)
            return
        }

        toast.success('Регистрация прощла успешно!')

        return data
    }
)

export const signInFx = createEffect(
    async ({ url, username, password }: ISignInFx) => {
        //*Делаем заппрос методом post передадим url и данные
        const { data } = await api.post(url, { username, password })

        //*Для ошибок со стороны сервера (такие как "Пользователь уже существует" и т.д)
        if (data.warningMessage) {
            toast.error(data.warningMessage)
            return
        }

        toast.success('Вход выполнен!')

        return data
    }
)

export const checkUserAuthFx = createEffect(async (url: string) => {
    try{
        const { data } = await api.get(url)
        return data
    }
    catch(e){
        const axiosError = e as AxiosError

        if(axiosError.response){
            if(axiosError.response.status === HTTPStatus.FORBIDDEN){
                return false
            }
        }

        toast.error((e as Error).message)
    }
})

export const logoutFx = createEffect(async (url: string) => {
    //не будем никаких данных возвращать, просто делаем запрос
    try{
        await api.get(url)
    }
    catch(e){
        toast.error((e as Error).message)
    }
})
