import { createDomain } from 'effector-next'

const mode = createDomain()

//*Вызывая функ. setMode мы mode передаём строчу с темой (light/dark)
export const setMode = mode.createEvent<string>()

//Создаём состояние $mode 
export const $mode = mode 
    .createStore<string>('light')   //По дефолту light тема
    .on(setMode, (_, mode) => mode) //mode.createEvent<string>() - от сюда берётся тема и устанавливается в Store 
