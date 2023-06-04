import { HTTPStatus } from "@/constans/httpStatuses"
import { AxiosError } from "axios"
import { toast } from "react-toastify"

//*Функция для вывода ошибок
export const showOutError = (error: unknown) => {
    const axiosError = error as AxiosError

    if(axiosError.response){    //*если ошибка есть...
        if(axiosError.response.status === HTTPStatus.UNAUTHORIZED){
            toast.error('Неверное имя пользователя или пароль!')
            return
        }
    }
    toast.error((error as Error).message) 
}