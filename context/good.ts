import { IGood } from '@/types/goods'
import { createDomain } from 'effector-next'

const good = createDomain()

//*Вызывая функ. setMode мы mode передаём строчу с темой (light/dark)
export const setGood = good.createEvent<IGood>()

//Создаём состояние $mode 
export const $good = good 
    .createStore<IGood>({} as IGood)   //По дефолту light тема
    .on(setGood, (_, mode) => mode) //mode.createEvent<string>() - от сюда берётся тема и устанавливается в Store 
