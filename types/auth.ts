import { FieldErrors, UseFormRegister } from "react-hook-form"

//*Интерфейс где прописаны данные которые мы получаем при вводе данных пользователя
export interface IInputs{
    name: string,
    email: string,
    password: string
}


export interface IAuthPageInput {
    register: UseFormRegister<IInputs>
    errors: FieldErrors<IInputs>
}