import { useStore } from 'effector-react'
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
import { $mode } from '@/context/mode'
import styles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/spinner.module.scss'

const CatalogFilterDesktop = ({
    priceRange,
    setPriceRange,
    setIsPriceRangeChanged,
    resetFilterBtnDisabled,
    spinner,
    resetFilter
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

            {/* CATEGORY */}
            {/*!**********************************************Здесь менять класс если что*************************************************** */}
            <div className={styles.filters__category}>
                <FilterCategoryAccordion
                    categoryList={category}
                    title="Категория товаров"
                    updateCategory={updateGoodsCategory}
                    setCategory={setGoodsCategory}
                />
            </div>

            {/* PRICE */}
            <div className={styles.filters__price}>
                <Accordion
                    title="Цена"
                    titleClass={`${styles.filters__category__btn} ${darkModeClass}`}
                    arrowOpenClass={styles.open}
                >
                    <div className={styles.filters__category__inner}>
                        <PriceRange
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            setIsPriceRangeChanged={setIsPriceRangeChanged}
                        />
                        <div style={{ height: 24 }} />
                    </div>
                </Accordion>
            </div>
            {/* SUBCATEGORY */}
            <div className={styles.filters__category}>
                <FilterCategoryAccordion
                    categoryList={subcategory}
                    title="Подкатегория товаров"
                    updateCategory={updateGoodsSubcategory}
                    setCategory={setGoodsSubcategory}
                />
            </div>

            {/* Buttons "Показать" и "Сбросить" */}
            <div className={styles.filters__actions}>
                <button
                    className={styles.filters__actions__show}
                    disabled={spinner || resetFilterBtnDisabled}
                >
                    {spinner ? <span className={spinnerStyles.spinner} style={{top: 6, left: '47%'}}/> : 'Показать'}
                </button>
                
                <button
                    className={styles.filters__actions__reset}
                    disabled={resetFilterBtnDisabled}
                    onClick={resetFilter}
                >
                    {spinner ? <span className={spinnerStyles.spinner} style={{top: 6, left: '47%' }}/> : 'Сбросить'}
                </button>
            </div>
        </div>
    )
}

export default CatalogFilterDesktop
