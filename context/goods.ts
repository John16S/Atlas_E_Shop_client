import { IGoods } from '@/types/goods'
import { createDomain } from 'effector-next'

const goods = createDomain()

export const setGoods = goods.createEvent<IGoods>()

//*Создаём 3 event для каждого состояния сортироваки
export const setGoodsCheapFirst = goods.createEvent()
export const setGoodsExpensiveFirst = goods.createEvent()
export const setGoodsByPopularity = goods.createEvent()

export const $goods = goods
    .createStore<IGoods>({} as IGoods)
    .on(setGoods, (_, goods) => goods)
    .on(setGoodsCheapFirst, (state) => ({
        ...state,
        rows: state.rows.sort((a, b) => a.price - b.price),
    }))
    .on(setGoodsExpensiveFirst, (state) => ({
        ...state,
        rows: state.rows.sort((a, b) => b.price - a.price),
    }))
    .on(setGoodsByPopularity, (state) => ({
        ...state,
        rows: state.rows.sort((a, b) => {
            if (a.bestseller && !b.bestseller) {
                return -1; // a - true, b - false, a должен быть первым
            }
            if (!a.bestseller && b.bestseller) {
                return 1; // a - false, b - true, b должен быть первым
            }
            return 0; // значения равны, порядок не важен
        }),
    }))
