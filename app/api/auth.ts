import { toast } from "react-toastify";
import { ISignUpFx, ISignInFx } from "@/types/auth";
import { createEffect } from "effector-next";
import api from '../axiosClient'    

//!Функции для запроса в БД
export const signUpFx = createEffect(
    async ({url, username, email, password}: ISignUpFx) => {
        //*Делаем заппрос методом post передадим url и данные
        const { data } = await api.post(url, { username, password, email }) 

        //*Для ошибок со стороны сервера (такие как "Пользователь уже существует" и т.д)
        if(data.warningMessage){
            toast.warning(data.warningMessage)
            return  
        }

        toast.success('Регистрация прощла успешно!')

        return data;
    }
)


export const signInFx = createEffect(
    async ({url, username, password}: ISignInFx) => {
        //*Делаем заппрос методом post передадим url и данные
        const { data } = await api.post(url, { username, password,}) 

        //*Для ошибок со стороны сервера (такие как "Пользователь уже существует" и т.д)
        if(data.warningMessage){
            toast.error(data.warningMessage)
            return  
        }

        toast.success('Вход выполнен!')

        return data;
    }
)