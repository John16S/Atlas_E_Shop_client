import { ISignUpFx } from "@/types/auth";
import { createEffect } from "effector-next";
import api from '../axiosClient'    
import { toast } from "react-toastify";


export const signUpFx = createEffect(
    async ({url, username, email, password}: ISignUpFx) => {
    //*Делаем заппрос методом post передадим url и данные
    const { data } = await api.post(url, { username, password, email }) 

    //*Для ошибок со стороны сервера (такие как "Пользователь уже существует" и т.д)
    if(data.warningMessage){
        toast.error(data.warningMessage)
        return  
    }

    return data;
    }
)