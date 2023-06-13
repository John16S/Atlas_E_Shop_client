import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFilterDesktop from './CatalogFilterDesktop'
import { ICatalogFilterProps } from '@/types/catalog'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import {
    $goodsCategory,
    $goodsSubcategory,
    setGoodsCategoriesFromQuery,
    setGoodsSubcategoriesFromQuery,
} from '@/context/goods'
import { useRouter } from 'next/router'
import { getQueryParamOnFirstRender } from '@/utils/common'
import CatalogFiltersMobile from './CatalogFiltresMobile'
import {
    checkQueryParams,
    updateParamsAndFilters,
    updateParamsAndFiltersFromQuery,
} from '@/utils/catalog'

const CatalogFilter = ({
    priceRange,
    setPriceRange,
    setIsPriceRangeChanged,
    resetFilterBtnDisabled,
    resetFilter,
    isPriceRangeChanged,
    currentPage,
    setIsFilterInQuery,
    closePopup,
    filtersMobileOpen,
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
            const {
                isValidCategory,
                isValidSubcategory,
                isValidPriceQuery,
                priceFromQueryValue,
                priceToQueryValue,
                categoryQueryValue,
                subcategoryQueryValue,
            } = checkQueryParams(router)
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

            if (isValidCategory && isValidSubcategory && isValidPriceQuery) {
                updateParamsAndFiltersFromQuery(() => {
                    updatePriceFromQuery(
                        +priceFromQueryValue,
                        +priceToQueryValue
                    )
                    setGoodsCategoriesFromQuery(categoryQueryValue)
                    setGoodsSubcategoriesFromQuery(subcategoryQueryValue)
                }, `${currentPage}${priceQuery}${categoryQuery}${subcategoryQuery}`)
                return
            }

            if (isValidPriceQuery) {
                updateParamsAndFiltersFromQuery(() => {
                    updatePriceFromQuery(
                        +priceFromQueryValue,
                        +priceToQueryValue
                    )
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

            if (isValidCategory && isValidPriceQuery) {
                updateParamsAndFiltersFromQuery(() => {
                    updatePriceFromQuery(
                        +priceFromQueryValue,
                        +priceToQueryValue
                    )
                    setGoodsCategoriesFromQuery(categoryQueryValue)
                }, `${currentPage}${priceQuery}${categoryQuery}`)
                return
            }

            if (isValidSubcategory && isValidPriceQuery) {
                updateParamsAndFiltersFromQuery(() => {
                    updatePriceFromQuery(
                        +priceFromQueryValue,
                        +priceToQueryValue
                    )
                    setGoodsSubcategoriesFromQuery(subcategoryQueryValue)
                }, `${currentPage}${priceQuery}${subcategoryQuery}`)
                return
            }
        } catch (error) {
            const err = error as Error

            if (err.message === 'URI malformed') {
                toast.warning('Неправильный url для фильтров')
                return
            }

            toast.error(err.message)
        }
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
                    `${initialPage}${priceQuery}${categoryQuery}${subcategoryQuery}`,
                    router
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
                    `${initialPage}${priceQuery}`,
                    router
                )
            }

            if (categories.length) {
                updateParamsAndFilters(
                    {
                        categ: encodedCategoryQuery,
                        offset: initialPage + 1,
                    },
                    `${initialPage}${categoryQuery}`,
                    router
                )
            }

            if (subcategories.length) {
                updateParamsAndFilters(
                    {
                        subcateg: encodedSubcategoryQuery,
                        offset: initialPage + 1,
                    },
                    `${initialPage}${subcategoryQuery}`,
                    router
                )
            }

            if (categories.length && subcategories.length) {
                updateParamsAndFilters(
                    {
                        categ: encodedCategoryQuery,
                        subcateg: encodedSubcategoryQuery,
                        offset: initialPage + 1,
                    },
                    `${initialPage}${categoryQuery}${subcategoryQuery}`,
                    router
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
                    `${initialPage}${priceQuery}${categoryQuery}`,
                    router
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
                    `${initialPage}${priceQuery}${subcategoryQuery}`,
                    router
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
                <CatalogFiltersMobile
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    setIsPriceRangeChanged={setIsPriceRangeChanged}
                    spinner={spinner}
                    applyFilters={applyFilters}
                    closePopup={closePopup}
                    resetFilterBtnDisabled={resetFilterBtnDisabled}
                    resetFilter={resetFilter}
                    filtersMobileOpen={filtersMobileOpen}
                />
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
