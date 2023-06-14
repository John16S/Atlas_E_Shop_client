import { IShoppingCartItem } from '@/types/shopping-cart'
import exp from 'constants'
import { createDomain } from 'effector'

const shoppingCart = createDomain()

export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>()
export const updateShoppingCart = shoppingCart.createEvent<IShoppingCartItem>()
export const removeShoppingCartItem = shoppingCart.createEvent<number>()
export const setTotalPrice = shoppingCart.createEvent<number>()
export const setDisableCart = shoppingCart.createEvent<boolean>()
export const updateCartItemTotalPrice = shoppingCart.createEvent<{
    goodId: number
    totalPrice: number
}>()
export const updateCartItemCount = shoppingCart.createEvent<{
    goodId: number
    count: number
}>()

const remove = (cartItems: IShoppingCartItem[], goodId: number) =>
    cartItems.filter((item) => item.goodId !== goodId)

function updateCartItem<T>(
    cartItems: IShoppingCartItem[],
    goodId: number,
    payload: T
) {
    return cartItems.map((item) => {
        if (item.goodId === goodId) {
            return {
                ...item,
                ...payload,
            }
        }
        return item
    })
}

//*создаём состояние $shoppingCart
export const $shoppingCart = shoppingCart
    .createStore<IShoppingCartItem[]>([]) //изначально у нас просто массив
    .on(setShoppingCart, (_, shoppingCart) => shoppingCart) //делаем setState массива из сервера
    .on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
    .on(removeShoppingCartItem, (state, goodId) => [...remove(state, goodId)])
    .on(updateCartItemTotalPrice, (state, { goodId, totalPrice }) => [
        ...updateCartItem(state, goodId, { totalPrice }),
    ])
    .on(updateCartItemCount, (state, { goodId, count }) => [
        ...updateCartItem(state, goodId, { count }),
    ])

export const $totalPrice = shoppingCart
    .createStore<number>(0)
    .on(setTotalPrice, (_, value) => value)


export const $disableCart = shoppingCart
    .createStore<boolean>(false) 
    .on(setDisableCart, (_, value) => value)
