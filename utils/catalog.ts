import { idGenerator } from './common'

//*функция для создания checkbox для categoryArray и subcategoryArray
const createCategoryCheckboxObj = (title: string) => ({
    title,
    checked: false,
    id: idGenerator(),
})

export const category = [
    'Men',
    'Women',
    'Kids',
    'Accessories',
    'Perfume',
].map(createCategoryCheckboxObj) //проходим по каждому элементу массива и создаём ...

export const subcategory = [
    'Shoes',
    'Outerwear', //Верхняя одежда'
    'Bags',
    'Underwear',
].map(createCategoryCheckboxObj)
