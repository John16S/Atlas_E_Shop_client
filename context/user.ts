import { IUser } from '@/types/auth'
import { createDomain } from 'effector-next'

//!State для пользователя для профиля на главной стр
const user = createDomain()

export const setUser = user.createEvent<IUser>()

export const $user = user
    .createStore({} as IUser)
    .on(setUser, (_, user) => user)
