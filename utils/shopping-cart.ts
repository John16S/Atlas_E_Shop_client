import { toast } from 'react-toastify'
import {
    addToCartFx,
    removeFromCartFx,
    updateCartItemFx,
} from '@/app/api/shopping-cart'
import {
    removeShoppingCartItem,
    // updateCartItemTotalPrice,
    updateShoppingCart,
} from '@/context/shopping-cart'

export const toggleCartItem = async (
    username: string,
    goodId: number,
    isInCart: boolean,
    setSpinner: (arg: boolean) => void
) => {
    try {
        setSpinner(true)
        //*проверяем если товар есть в корзине, то...
        if (isInCart) {
            await removeFromCartFx(`/shopping-cart/removeOne/${goodId}`)
            removeShoppingCartItem(goodId)  //удаляем его
            return
        }

        //*Иначе делаем запрос на добавление
        const data = await addToCartFx({
            url: '/shopping-cart/add',
            username,
            goodId,
        }) 

        //*и обновляем корзину
        updateShoppingCart(data)
    } catch (e) {
        toast.error((e as Error).message)
    } finally {
        setSpinner(false)
    }
}

export const removeItemFromCart = async (partId: number) => {
    try {
        await removeFromCartFx(`/shopping-cart/one/${partId}`)
        removeShoppingCartItem(partId)
    } catch (error) {
        toast.error((error as Error).message)
    }
}

export const updateTotalPrice = async (total_price: number, partId: number) => {
    const data = await updateCartItemFx({
        url: `/shopping-cart/total-price/${partId}`,
        payload: { total_price },
    })

    updateCartItemTotalPrice({ partId, total_price: data.total_price })
}
