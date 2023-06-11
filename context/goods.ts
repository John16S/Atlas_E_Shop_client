import { IGoods } from '@/types/goods'
import { createDomain } from 'effector-next'

const goods = createDomain()

export const setGoods = goods.createEvent<IGoods>()

export const $goods = goods
    .createStore<IGoods>({} as IGoods)
    .on(setGoods, (_, goods) => goods)
