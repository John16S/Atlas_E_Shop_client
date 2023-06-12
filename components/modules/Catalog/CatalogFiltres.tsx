import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFilterDesktop from './CatalogFilterDesktop'
import { ICatalogFilterProps } from '@/types/catalog'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useStore } from 'effector-react'
import {
    $goodsCategory,
    $goodsSubcategory,
    setFilteredGood,
} from '@/context/goods'
import { useRouter } from 'next/router'
import { getGoodsFx } from '@/app/api/goods'

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
                router.push(
                    {
                        query: {
                            ...router.query,
                            categ: encodedCategoryQuery,
                            subcateg: encodedSubcategoryQuery,
                            priceFrom,
                            priceTo,
                            offset: initialPage + 1,
                        },
                    },
                    undefined,
                    { shallow: true }
                )

                const data = await getGoodsFx(
                    `/goods/?limit=20&offset=${initialPage}${priceQuery}${categoryQuery}${subcategoryQuery}`
                )
                setFilteredGood(data)
                return
            }

            if (isPriceRangeChanged) {
                router.push(
                    {
                        query: {
                            ...router.query,
                            priceFrom,
                            priceTo,
                            offset: initialPage + 1,
                        },
                    },
                    undefined,
                    { shallow: true }
                )
                const data = await getGoodsFx(
                    `/goods/?limit=20&offset=${initialPage}${priceQuery}`
                )
                setFilteredGood(data)
            }

            if (categories.length) {
                router.push(
                    {
                        query: {
                            ...router.query,
                            categ: encodedCategoryQuery,
                            offset: initialPage + 1,
                        },
                    },
                    undefined,
                    { shallow: true }
                )

                const data = await getGoodsFx(
                    `/goods/?limit=20&offset=${initialPage}${categoryQuery}`
                )
                setFilteredGood(data)
            }

            if (subcategories.length) {
                router.push(
                    {
                        query: {
                            ...router.query,
                            subcateg: encodedSubcategoryQuery,
                            offset: initialPage + 1,
                        },
                    },
                    undefined,
                    { shallow: true }
                )

                const data = await getGoodsFx(
                    `/goods/?limit=20&offset=${initialPage}${subcategoryQuery}`
                )
                setFilteredGood(data)
            }

            if (categories.length && subcategories.length) {
                router.push(
                    {
                        query: {
                            ...router.query,
                            categ: encodedCategoryQuery,
                            subcateg: encodedSubcategoryQuery,
                            offset: initialPage + 1,
                        },
                    },
                    undefined,
                    { shallow: true }
                )

                const data = await getGoodsFx(
                    `/goods/?limit=20&offset=${initialPage}${categoryQuery}${subcategoryQuery}`
                )
                setFilteredGood(data)
                return
            }

            if (categories.length && isPriceRangeChanged) {
                router.push(
                    {
                        query: {
                            ...router.query,
                            categ: encodedCategoryQuery,
                            priceFrom,
                            priceTo,
                            offset: initialPage + 1,
                        },
                    },
                    undefined,
                    { shallow: true }
                )

                const data = await getGoodsFx(
                    `/goods/?limit=20&offset=${initialPage}${priceQuery}${categoryQuery}`
                )
                setFilteredGood(data)
            }

            if (subcategories.length && isPriceRangeChanged) {
                router.push(
                    {
                        query: {
                            ...router.query,
                            subcateg: encodedSubcategoryQuery,
                            priceFrom,
                            priceTo,
                            offset: initialPage + 1,
                        },
                    },
                    undefined,
                    { shallow: true }
                )

                const data = await getGoodsFx(
                    `/goods/?limit=20&offset=${initialPage}${priceQuery}${subcategoryQuery}`
                )
                setFilteredGood(data)
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
