import { IShoppingCartItem } from '@/types/shopping-cart'
import exp from 'constants'
import { createDomain } from 'effector'

const shoppingCart = createDomain()

export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>()
export const updateShoppingCart = shoppingCart.createEvent<IShoppingCartItem>()
export const removeShoppingCartItem = shoppingCart.createEvent<number>()

const remove = (cartItems: IShoppingCartItem[], goodId: number) =>
    cartItems.filter((item) => item.goodId !== goodId)

//*создаём состояние $shoppingCart
export const $shoppingCart = shoppingCart
    .createStore<IShoppingCartItem[]>([]) //изначально у нас просто массив
    .on(setShoppingCart, (_, shoppingCart) => shoppingCart) //делаем setState массива из сервера
    .on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
    .on(removeShoppingCartItem, (state, goodId) => [...remove(state, goodId)])
