export interface IGood {
    id: number
    name: string
    description: string
    price: number
    size: string
    image: string
    quantity: number
    category: string
    subcategory: string
    bestseller: boolean
    new: boolean
}

export interface IGoods {
    count: number
    rows: IGood[]
}
