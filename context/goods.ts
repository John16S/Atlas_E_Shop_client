import { IFilterCheckboxItem } from '@/types/catalog'
import { IGoods } from '@/types/goods'
import { category, subcategory } from '@/utils/catalog'
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
                return -1 // a - true, b - false, a должен быть первым
            }
            if (!a.bestseller && b.bestseller) {
                return 1 // a - false, b - true, b должен быть первым
            }
            return 0 // значения равны, порядок не важен
        }),
    }))

//*Для фильтрации
export const setGoodsCategory = goods.createEvent<IFilterCheckboxItem[]>()
export const setGoodsSubcategory = goods.createEvent<IFilterCheckboxItem[]>()
//*для изменение состояние checkbox-a
export const updateGoodsCategory = goods.createEvent<IFilterCheckboxItem>()
export const updateGoodsSubcategory = goods.createEvent<IFilterCheckboxItem>()

//*вспомогательная функция
export const updateCategoryHelper = (
    category: IFilterCheckboxItem[],
    id: string,
    payload: Partial<IFilterCheckboxItem>
) =>
    category.map((item) => {
        if (item.id === id) {
            return {
                ...item,
                ...payload,
            }
        }

        return item
    })

//********************************************************************************* */
export const setGoodsCategoriesFromQuery =
    goods.createEvent<string[]>()
export const setGoodsSubcategoriesFromQuery =
    goods.createEvent<string[]>()

const updateGoodsFromQuery = (
    category: IFilterCheckboxItem[],
    categoryFromQuery: string[]
) =>
    category.map((item) => {
        if (categoryFromQuery.find((title) => title === item.title)) {
            return {
                ...item,
                checked: true,
            }
        }
        return item
    })
//*********************************************************************************** */

export const $goodsCategory = goods
    .createStore<IFilterCheckboxItem[]>(category as IFilterCheckboxItem[])
    .on(setGoodsCategory, (_, goods) => goods)
    .on(updateGoodsCategory, (state, payload) => [
        ...updateCategoryHelper(state, payload.id as string, {
            checked: payload.checked,
        }),
    ])
    .on(setGoodsCategoriesFromQuery, (state, categoriesFromQuery) => [
        ...updateGoodsFromQuery(state, categoriesFromQuery),
    ])

export const $goodsSubcategory = goods
    .createStore<IFilterCheckboxItem[]>(subcategory as IFilterCheckboxItem[])
    .on(setGoodsSubcategory, (_, goods) => goods)
    .on(updateGoodsSubcategory, (state, payload) => [
        ...updateCategoryHelper(state, payload.id as string, {
            checked: payload.checked,
        }),
    ])
    .on(setGoodsSubcategoriesFromQuery, (state, subcategoriesFromQuery) => [
        ...updateGoodsFromQuery(state, subcategoriesFromQuery),
    ])

export const setFilteredGood = goods.createEvent<IGoods>()
export const $filteredGood = goods
    .createStore<IGoods>({} as IGoods)
    .on(setFilteredGood, (_, goods) => goods)
