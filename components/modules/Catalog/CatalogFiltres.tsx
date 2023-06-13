import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFilterDesktop from './CatalogFilterDesktop'
import { ICatalogFilterProps } from '@/types/catalog'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import {
    $goodsCategory,
    $goodsSubcategory,
    setFilteredGood,
    setGoodsCategoriesFromQuery,
    setGoodsSubcategoriesFromQuery,
} from '@/context/goods'
import { useRouter } from 'next/router'
import { getGoodsFx } from '@/app/api/goods'
import { getQueryParamOnFirstRender } from '@/utils/common'

const CatalogFilter = ({
    priceRange,
    setPriceRange,
    setIsPriceRangeChanged,
    resetFilterBtnDisabled,
    resetFilter,
    isPriceRangeChanged,
    currentPage,
    setIsFilterInQuery,
}: ICatalogFilterProps) => {
    const isMobile = useMediaQuery(820)
    const [spinner, setSpinner] = useState(false)
    const router = useRouter()

    //*Получаем доступ к состояниям категорий и подкатегорий (checkbox) для фильтрации
    const category = useStore($goodsCategory)
    const subcategory = useStore($goodsSubcategory)

    useEffect(() => {
        applyFilterFromQuery()
    }, [])

    const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
        setIsFilterInQuery(true)
        setPriceRange([+priceFrom, +priceTo])
        setIsPriceRangeChanged(true)
    }

    //*Функция будет вызыватся при первом рендеринге
    const applyFilterFromQuery = async () => {
        try {
            //*получаем фильтры из query (адресной строки)
            const priceFromQueryValue = getQueryParamOnFirstRender(
                'priceFrom',
                router
            )
            const priceToQueryValue = getQueryParamOnFirstRender(
                'priceTo',
                router
            )
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
                Array.isArray(categoryQueryValue) &&
                !!categoryQueryValue?.length
            const isValidSubcategory =
                Array.isArray(subcategoryQueryValue) &&
                !!subcategoryQueryValue?.length

            //*конечный результат
            const categoryQuery = `&categ=${getQueryParamOnFirstRender(
                'categ',
                router
            )}`
            const subcategoryQuery = `&subcateg=${getQueryParamOnFirstRender(
                'subcateg',
                router
            )}`
            const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo${priceToQueryValue}`

            if (
                isValidCategory &&
                isValidSubcategory &&
                priceFromQueryValue &&
                priceToQueryValue
            ) {
                updateParamsAndFiltersFromQuery(() => {
                    updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
                    setGoodsCategoriesFromQuery(categoryQueryValue)
                    setGoodsSubcategoriesFromQuery(subcategoryQueryValue)
                }, `${currentPage}${priceQuery}${categoryQuery}${subcategoryQuery}`)
                return
            }

            if (priceFromQueryValue && priceToQueryValue) {
                updateParamsAndFiltersFromQuery(() => {
                    updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
                }, `${currentPage}${priceQuery}`)
            }

            if (isValidCategory && isValidSubcategory) {
                updateParamsAndFiltersFromQuery(() => {
                    setIsFilterInQuery(true)
                    setGoodsCategoriesFromQuery(categoryQueryValue)
                    setGoodsSubcategoriesFromQuery(subcategoryQueryValue)
                }, `${currentPage}${categoryQuery}${subcategoryQuery}`)
                return
            }

            if (isValidCategory) {
                updateParamsAndFiltersFromQuery(() => {
                    setIsFilterInQuery(true)
                    setGoodsCategoriesFromQuery(categoryQueryValue)
                }, `${currentPage}${categoryQuery}`)
            }

            if (isValidSubcategory) {
                updateParamsAndFiltersFromQuery(() => {
                    setIsFilterInQuery(true)
                    setGoodsSubcategoriesFromQuery(subcategoryQueryValue)
                }, `${currentPage}${subcategoryQuery}`)
            }

            if (isValidCategory && priceFromQueryValue && priceToQueryValue) {
                updateParamsAndFiltersFromQuery(() => {
                    updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
                    setGoodsCategoriesFromQuery(categoryQueryValue)
                }, `${currentPage}${priceQuery}${categoryQuery}`)
                return
            }

            if (
                isValidSubcategory &&
                priceFromQueryValue &&
                priceToQueryValue
            ) {
                updateParamsAndFiltersFromQuery(() => {
                    updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
                    setGoodsSubcategoriesFromQuery(subcategoryQueryValue)
                }, `${currentPage}${priceQuery}${subcategoryQuery}`)
                return
            }
        } catch (e) {
            toast.error((e as Error).message)
        }
    }

    const updateParamsAndFiltersFromQuery = async (
        callback: VoidFunction,
        path: string
    ) => {
        callback()
        const data = await getGoodsFx(`/goods/?limit=20&offset=${path}`)
        setFilteredGood(data)
    }

    async function updateParamsAndFilters<IUpdateParams>(
        updatedParams: IUpdateParams,
        path: string
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

    const applyFilters = async () => {
        setIsFilterInQuery(true)
        try {
            setSpinner(true)
            const priceFrom = Math.ceil(priceRange[0])
            const priceTo = Math.ceil(priceRange[1])
            const priceQuery = isPriceRangeChanged
                ? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
                : ''
            const categories = category
                .filter((item) => item.checked)
                .map((item) => item.title)
            const subcategories = subcategory
                .filter((item) => item.checked)
                .map((item) => item.title)

            const encodedCategoryQuery = encodeURIComponent(
                JSON.stringify(categories)
            )
            const encodedSubcategoryQuery = encodeURIComponent(
                JSON.stringify(subcategories)
            )

            const categoryQuery = `&category=${encodedCategoryQuery}`
            const subcategoryQuery = `&subcategory=${encodedSubcategoryQuery}`

            const initialPage = currentPage > 0 ? 0 : currentPage

            if (
                categories.length &&
                subcategories.length &&
                isPriceRangeChanged
            ) {
                updateParamsAndFilters(
                    {
                        categ: encodedCategoryQuery,
                        subcateg: encodedSubcategoryQuery,
                        priceFrom,
                        priceTo,
                        offset: initialPage + 1,
                    },
                    `${initialPage}${priceQuery}${categoryQuery}${subcategoryQuery}`
                )
                return
            }

            if (isPriceRangeChanged) {
                updateParamsAndFilters(
                    {
                        priceFrom,
                        priceTo,
                        offset: initialPage + 1,
                    },
                    `${initialPage}${priceQuery}`
                )
            }

            if (categories.length) {
                updateParamsAndFilters(
                    {
                        categ: encodedCategoryQuery,
                        offset: initialPage + 1,
                    },
                    `${initialPage}${categoryQuery}`
                )
            }

            if (subcategories.length) {
                updateParamsAndFilters(
                    {
                        subcateg: encodedSubcategoryQuery,
                        offset: initialPage + 1,
                    },
                    `${initialPage}${subcategoryQuery}`
                )
            }

            if (categories.length && subcategories.length) {
                updateParamsAndFilters(
                    {
                        categ: encodedCategoryQuery,
                        subcateg: encodedSubcategoryQuery,
                        offset: initialPage + 1,
                    },
                    `${initialPage}${categoryQuery}${subcategoryQuery}`
                )
                return
            }

            if (categories.length && isPriceRangeChanged) {
                updateParamsAndFilters(
                    {
                        categ: encodedCategoryQuery,
                        priceFrom,
                        priceTo,
                        offset: initialPage + 1,
                    },
                    `${initialPage}${priceQuery}${categoryQuery}`
                )
            }

            if (subcategories.length && isPriceRangeChanged) {
                updateParamsAndFilters(
                    {
                        subcateg: encodedSubcategoryQuery,
                        priceFrom,
                        priceTo,
                        offset: initialPage + 1,
                    },
                    `${initialPage}${priceQuery}${subcategoryQuery}`
                )
            }
        } catch (e) {
            toast.error((e as Error).message)
        } finally {
            setSpinner(false)
        }
    }

    //У нас будет 2 CatalogFilter (1-CatalogFilterMobile, 2-CatalogFilterDesktop)
    return (
        <>
            {isMobile ? (
                <div />
            ) : (
                <CatalogFilterDesktop
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    setIsPriceRangeChanged={setIsPriceRangeChanged}
                    resetFilterBtnDisabled={resetFilterBtnDisabled}
                    spinner={spinner}
                    resetFilter={resetFilter}
                    applyFilters={applyFilters}
                />
            )}
        </>
    )
}

export default CatalogFilter
