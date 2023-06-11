import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { AnimatePresence } from 'framer-motion'
import CategoryBlock from '@/components/modules/Catalog/CategoryBlock'
import FilterSelect from '@/components/modules/Catalog/FilterSelect'
import { getGoodsFx } from '@/app/api/goods'
import { $goods, setGoods } from '@/context/goods'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import CatalogItem from '@/components/modules/Catalog/CatalogItem'

const CatalogPage = () => {
    //стили для тёмный темы
    const mode = useStore($mode) //получаем доступ к состоянию mode
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const goods = useStore($goods) //получаем доступ к состоянию товара
    const [spinner, setSpinner] = useState(false)

    useEffect(() => {
        loadGoods()
    }, [])

    const loadGoods = async () => {
        try {
            setSpinner(true)
            const data = await getGoodsFx('/goods/?limit=50&offset=0')

            setGoods(data)
        } catch (e) {
            toast.error((e as Error).message)
        } finally {
            setSpinner(false)
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
                        {false && <CategoryBlock title="Категория товаров:" />}
                    </AnimatePresence>
                    <AnimatePresence>
                        {false && (
                            <CategoryBlock title="Подкатегория товаров:" />
                        )}
                    </AnimatePresence>

                    <div className={styles.catalog__top__inner}>
                        <button
                            className={`${styles.catalog__top__reset} ${darkModeClass}`}
                            disabled={true}
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
                        <div className="">Filter</div>

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
                </div>
            </div>
        </section>
    )
}

export default CatalogPage
