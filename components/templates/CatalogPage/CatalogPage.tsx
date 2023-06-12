import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import CategoryBlock from '@/components/modules/Catalog/CategoryBlock'
import FilterSelect from '@/components/modules/Catalog/FilterSelect'
import { getGoodsFx } from '@/app/api/goods'
import {
    $filteredGood,
    $goods,
    $goodsCategory,
    $goodsSubcategory,
    setGoods,
    setGoodsCategory,
    setGoodsSubcategory,
    updateGoodsCategory,
    updateGoodsSubcategory,
} from '@/context/goods'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import CatalogItem from '@/components/modules/Catalog/CatalogItem'
import ReactPaginate from 'react-paginate'
import { IQueryParams } from '@/types/catalog'
import { useRouter } from 'next/router'
import { IGoods } from '@/types/goods'
import CatalogFilter from '@/components/modules/Catalog/CatalogFiltres'
import styles from '@/styles/catalog/index.module.scss'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
    //стили для тёмный темы
    const mode = useStore($mode) //получаем доступ к состоянию mode
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const goods = useStore($goods) //получаем доступ к состоянию товара
    const [spinner, setSpinner] = useState(false)
    const [priceRange, setPriceRange] = useState([1000, 9000])
    const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)

    //*работа с пагинацией
    //* проверка (есть ли он вообще && чиссло ли это && больше 0)
    const pagesCount = Math.ceil(goods.count / 20) //чтобы всегда было целое число
    const isValidOffset =
        query.offset && !isNaN(+query.offset) && +query.offset > 0
    const [currentPage, setCurrentPage] = useState(
        isValidOffset ? +query.offset - 1 : 0
    )
    const router = useRouter()

    //*Получаем доступ к состояниям категорий и подкатегорий (checkbox) для фильтрации
    const category = useStore($goodsCategory)
    const subcategory = useStore($goodsSubcategory)

    //*всё для кнопки "Сбросить фильтр"
    const isAnyCategoryChecked = category.some((item) => item.checked)
    const isAnySubcategoryChecked = subcategory.some((item) => item.checked)
    const resetFilterBtnDisabled = !(
        isPriceRangeChanged ||
        isAnyCategoryChecked ||
        isAnySubcategoryChecked
    )

    const filteredGood = useStore($filteredGood) //получаем доступ к состоянию отфильтрованного товара
    const [isFilterInQuery, setIsFilterInQuery] = useState(false)
    //*это функция работает только при певом рендеринге
    useEffect(() => {
        loadGoods()
    }, [filteredGood, isFilterInQuery])

    console.log(goods.rows)

    const loadGoods = async () => {
        try {
            setSpinner(true)
            const data = await getGoodsFx('/goods/?limit=20&offset=0')

            //*проверка, если offset не валидный, то заменяем его на 1
            if (!isValidOffset) {
                router.replace({
                    query: {
                        offset: 1,
                    },
                })
                resetPagination(data)
                return
            }

            //*если же валидный, то делаем проверку чтоб он не был больше страниц чем на сервере
            if (isValidOffset) {
                if (+query.offset > Math.ceil(data.count / 20)) {
                    router.push(
                        {
                            query: {
                                ...query,
                                offset: 1,
                            },
                        },
                        undefined,
                        { shallow: true }
                    )
                    setCurrentPage(0)
                    setGoods(isFilterInQuery ? filteredGood : data)
                    return
                }
                //*только если isValidOffset, тогда делаем запрос на сервер
                const offset = +query.offset - 1
                const result = await getGoodsFx(
                    `/goods?limit=20&offset=${offset}`
                )

                setCurrentPage(offset)
                setGoods(isFilterInQuery ? filteredGood : result)
                return
            }

            //*иначе, заполняем по умолчанию
            setCurrentPage(0)
            setGoods(isFilterInQuery ? filteredGood : data)
        } catch (e) {
            toast.error((e as Error).message)
        } finally {
            setSpinner(false)
        }
    }

    const resetPagination = (data: IGoods) => {
        setCurrentPage(0)
        setGoods(data)
    }

    //*Функция при переходе по пагинации загружались другие данные
    const handlePaggeChange = async ({ selected }: { selected: number }) => {
        try {
            const data = await getGoodsFx('/goods/?limit=20&offset=0')

            if (selected > pagesCount) {
                resetPagination(data)
                return
            }

            if (isValidOffset && +query.offset > Math.ceil(data.count / 20)) {
                resetPagination(data)
                return
            }

            const result = await getGoodsFx(
                `/goods/?limit=20&offset=${selected}`
            )

            router.push(
                {
                    query: {
                        ...router.query,
                        offset: selected + 1,
                    },
                },
                undefined,
                { shallow: true }
            )

            setCurrentPage(selected)
            setGoods(result)
        } catch (e) {}
    }

    //*Функция "Сбросить фильтр"
    const resetFilter = async () => {
        try {
            const data = await getGoodsFx('/goods/?limit=20&offset=0')

            setGoodsCategory(
                category.map((item) => ({ ...item, checked: false }))
            )
            setGoodsSubcategory(
                subcategory.map((item) => ({ ...item, checked: false }))
            )

            setGoods(data)
            setPriceRange([1000, 9000])
            setIsPriceRangeChanged(false)
        } catch (e) {
            toast.error((e as Error).message)
        }
    }

    return (
        <section className={styles.catalog}>
            <div className={`container ${styles.catalog__container}`}>
                <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
                    Каталог товаров
                </h2>

                {/* Верхний блок каталогов */}
                <div className={`${styles.catalog__top} ${darkModeClass}`}>
                    <AnimatePresence>
                        {isAnyCategoryChecked && (
                            <CategoryBlock
                                title="Категория товаров:"
                                event={updateGoodsCategory}
                                categoryList={category}
                            />
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {isAnySubcategoryChecked && (
                            <CategoryBlock
                                title="Подкатегория товаров:"
                                event={updateGoodsSubcategory}
                                categoryList={subcategory}
                            />
                        )}
                    </AnimatePresence>

                    <div className={styles.catalog__top__inner}>
                        <button
                            className={`${styles.catalog__top__reset} ${darkModeClass}`}
                            disabled={resetFilterBtnDisabled}
                            onClick={resetFilter}
                        >
                            Сбросить фильтр
                        </button>
                        <FilterSelect />
                    </div>
                </div>

                {/* Нижний блок каталогов */}
                <div className={styles.catalog__bottom}>
                    <div className={styles.catalog__bottom__inner}>
                        {/* Блок фильтра */}
                        <CatalogFilter
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            setIsPriceRangeChanged={setIsPriceRangeChanged}
                            resetFilterBtnDisabled={resetFilterBtnDisabled}
                            resetFilter={resetFilter}
                            isPriceRangeChanged={isPriceRangeChanged}
                            currentPage={currentPage}
                            setIsFilterInQuery={setIsFilterInQuery}
                        />

                        {/* Блок списка товаров */}
                        {spinner ? (
                            <ul className={skeletonStyles.skeleton}>
                                {Array.from(new Array(8)).map((_, i) => (
                                    <li
                                        className={`${
                                            skeletonStyles.skeleton__item
                                        } ${
                                            mode === 'dark'
                                                ? `${skeletonStyles.dark_mode}`
                                                : ''
                                        }`}
                                        key={i}
                                    >
                                        <div
                                            className={
                                                skeletonStyles.skeleton__item__light
                                            }
                                        />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <ul className={styles.catalog__list}>
                                {goods.rows?.length ? (
                                    goods.rows.map((item) => (
                                        <CatalogItem
                                            item={item}
                                            key={item.id}
                                        />
                                    ))
                                ) : (
                                    <span>Список товаров пуст...</span>
                                )}
                            </ul>
                        )}
                    </div>

                    {/* Блок пагинации страниц */}
                    <ReactPaginate
                        containerClassName={styles.catalog__bottom__list}
                        pageClassName={styles.catalog__bottom__list__item}
                        pageLinkClassName={
                            styles.catalog__bottom__list__item__link
                        }
                        breakClassName={styles.catalog__bottom__list__break}
                        previousClassName={styles.catalog__bottom__list__prev}
                        nextClassName={styles.catalog__bottom__list__next}
                        breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
                        breakLabel="..."
                        pageCount={pagesCount}
                        forcePage={currentPage}
                        onPageChange={handlePaggeChange}
                    />
                </div>
            </div>
        </section>
    )
}

export default CatalogPage
