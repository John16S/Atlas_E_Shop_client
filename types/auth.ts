import { FieldErrors, UseFormRegister } from 'react-hook-form'

//*Интерфейс где прописаны данные которые мы получаем при вводе данных пользователя
//в файле  components/modules/AuthPage/SignUpForm
export interface IInputs {
    name: string
    email: string
    password: string
}

//в файле  components/elements/AuthPage
export interface IAuthPageInput {
    register: UseFormRegister<IInputs>
    errors: FieldErrors<IInputs>
}

//тип данных котрый отправляется в БД при запросе создания user в файле app/api/auth
export interface ISignUpFx {
    url: string
    username: string
    email: string
    password: string
}
