import { NextRouter } from 'next/router'
import { getQueryParamOnFirstRender, idGenerator } from './common'
import { getGoodsFx } from '@/app/api/goods'
import { setFilteredGood } from '@/context/goods'

//*функция для создания checkbox для categoryArray и subcategoryArray
const createCategoryCheckboxObj = (title: string) => ({
    title,
    checked: false,
    id: idGenerator(),
})

export const category = ['Men', 'Women', 'Kids', 'Accessories', 'Perfume'].map(
    createCategoryCheckboxObj
) //проходим по каждому элементу массива и создаём ...

export const subcategory = [
    'Shoes',
    'Outerwear', //Верхняя одежда'
    'Bags',
    'Underwear',
    'sadsdqwqd',
    'Underwdwqdqwdqwdear',
].map(createCategoryCheckboxObj)

const checkPriceFromQuery = (price: number) =>
    price && !isNaN(price) && price >= 0 && price <= 10000

export const checkQueryParams = (router: NextRouter) => {
    const priceFromQueryValue = getQueryParamOnFirstRender(
        'priceFrom',
        router
    ) as string
    const priceToQueryValue = getQueryParamOnFirstRender(
        'priceTo',
        router
    ) as string
    const categoryQueryValue = JSON.parse(
        decodeURIComponent(
            getQueryParamOnFirstRender('categ', router) as string
        )
    )
    const subcategoryQueryValue = JSON.parse(
        decodeURIComponent(
            getQueryParamOnFirstRender('subcateg', router) as string
        )
    )

    //*также проверяем на их валидность (массивы ли они)
    const isValidCategory =
        Array.isArray(categoryQueryValue) && !!categoryQueryValue?.length
    const isValidSubcategory =
        Array.isArray(subcategoryQueryValue) && !!subcategoryQueryValue?.length
    const isValidPriceQuery =
        checkPriceFromQuery(+priceFromQueryValue) &&
        checkPriceFromQuery(+priceToQueryValue)

    return {
        isValidCategory,
        isValidSubcategory,
        isValidPriceQuery,
        priceFromQueryValue,
        priceToQueryValue,
        categoryQueryValue,
        subcategoryQueryValue,
    }
}

export const updateParamsAndFiltersFromQuery = async (
    callback: VoidFunction,
    path: string
) => {
    callback()
    const data = await getGoodsFx(`/goods/?limit=20&offset=${path}`)
    setFilteredGood(data)
}

export async function updateParamsAndFilters<IUpdateParams>(
    updatedParams: IUpdateParams,
    path: string,
    router: NextRouter
) {
    //*для очищение из запроса в поискавой строке от выбранных фильтров
    const params = router.query
    delete params.categ
    delete params.subcateg
    delete params.priceFrom
    delete params.priceTo

    router.push(
        {
            query: {
                ...params,
                ...updatedParams,
            },
        },
        undefined,
        { shallow: true }
    )
    const data = await getGoodsFx(`/goods/?limit=20&offset=${path}`)
    setFilteredGood(data)
}
