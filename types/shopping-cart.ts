export interface IShoppingCartItem {
    id: number
    userId: number
    goodId: number
    name: string
    price: number
    size: string
    image: string
    category: string
    subcategory: string
    quantity: number
    count: number
    totalPrice: number
}

export interface IAddToCartFx {
    url: string
    username: string
    goodId: number
}

export interface IUpdateCartItemFx {
    url: string
    payload: {
        totalPrice?: number
        count?: number
    }
}

export interface ICartItemCounterProps {
    totalCount: number
    goodId: number
    initialCount: number
    increasePrice: VoidFunction
    decreasePrice: VoidFunction
}
