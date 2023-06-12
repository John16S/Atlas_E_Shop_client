import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import styles from '@/styles/catalog/index.module.scss'
import {
    $goodsCategory,
    $goodsSubcategory,
    setGoodsCategory,
    setGoodsSubcategory,
    updateGoodsCategory,
    updateGoodsSubcategory,
} from '@/context/goods'
import FilterCategoryAccordion from './FilterCategoryAccordion'
import Accordion from '@/components/elements/Accordion/Accordion'
import PriceRange from './PriceRange'
import { ICatalogFilterDesktop } from '@/types/catalog'

const CatalogFilterDesktop = ({
    priceRange,
    setPriceRange,
    setIsPriceRangeChanged,
}: ICatalogFilterDesktop) => {
    //стили для тёмный темы
    const mode = useStore($mode) //получаем доступ к состоянию mode
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    //*Получаем доступ к состояниям категорий и подкатегорий (checkbox) для фильтрации
    const category = useStore($goodsCategory)
    const subcategory = useStore($goodsSubcategory)

    console.log()

    return (
        <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
            <h3
                className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}
            >
                Фильтры
            </h3>

            {/*!**********************************************Здесь менять класс если что*************************************************** */}
            <div className={styles.filtres__category_category}>
                <FilterCategoryAccordion
                    categoryList={category}
                    title="Категория товаров"
                    updateCategory={updateGoodsCategory}
                    setCategory={setGoodsCategory}
                />
            </div>

            <div className={styles.filters__price}>
                <Accordion
                    title="Цена"
                    titleClass={`${styles.filtres__category__btn} ${darkModeClass}`}
                    arrowOpenClass={styles.open}
                >
                    <div className={styles.filtres__category__inner}>
                        <PriceRange
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            setIsPriceRangeChanged={setIsPriceRangeChanged}
                        />
                    </div>
                </Accordion>
            </div>

            <div className={styles.filtres__category_category}>
                <FilterCategoryAccordion
                    categoryList={subcategory}
                    title="Подкатегория товаров"
                    updateCategory={updateGoodsSubcategory}
                    setCategory={setGoodsSubcategory}
                />
            </div>
        </div>
    )
}

export default CatalogFilterDesktop
