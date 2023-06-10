import { IShopingcartItem } from "@/types/shopping-cart";
import exp from "constants";
import { createDomain } from "effector";

const shoppingCart = createDomain()

export const setShoppingCart = shoppingCart.createEvent<IShopingcartItem[]>()

//*создаём состояние $shoppingCart 
export const $shoppingCart = shoppingCart
  .createStore<IShopingcartItem[]>([])  //изначально у нас просто массив
  .on(setShoppingCart, (_, shoppingCart) => shoppingCart) //делаем setState массива из сервера