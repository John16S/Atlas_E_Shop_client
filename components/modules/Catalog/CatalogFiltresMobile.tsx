import { ICatalogFilterMobile } from '@/types/catalog'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import spinnerStyles from '@/styles/spinner/spinner.module.scss'
import FiltersPopupTop from './FiltersPopupTop'
import {
    $goodsCategory,
    $goodsSubcategory,
    setGoodsCategory,
    setGoodsSubcategory,
    updateGoodsCategory,
    updateGoodsSubcategory,
} from '@/context/goods'
import FiltersPopup from './FiltersPopup'
import { useState } from 'react'
import styles from '@/styles/catalog/index.module.scss'
import Accordion from '@/components/elements/Accordion/Accordion'
import PriceRange from './PriceRange'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const CatalogFiltersMobile = ({
    spinner,
    resetFilterBtnDisabled,
    resetFilter,
    closePopup,
    applyFilters,
    filtersMobileOpen,
    priceRange,
    setPriceRange,
    setIsPriceRangeChanged,
}: ICatalogFilterMobile) => {
    //стили для тёмный темы
    const mode = useStore($mode) //получаем доступ к состоянию mode
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const isMobile = useMediaQuery(820)

    //*Получаем доступ к состояниям категорий и подкатегорий (checkbox) для фильтрации
    const category = useStore($goodsCategory)
    const subcategory = useStore($goodsSubcategory)
    const [openCategory, setOpenCategory] = useState(false)
    const [opneSubcategory, setOpenSubcategory] = useState(false)
    const handleOpenCategories = () => setOpenCategory(true)
    const handleCloseCategories = () => setOpenCategory(false)
    const handleOpenSubcategories = () => setOpenSubcategory(true)
    const handleCloseSubcegories = () => setOpenSubcategory(false)
    const isAnyCategoryChecked = category.some((item) => item.checked)
    const isAnySubcategoryChecked = subcategory.some((item) => item.checked)

    const resetAllCategories = () =>
        setGoodsCategory(category.map((item) => ({ ...item, checked: false })))
    const resetAllSubcategories = () =>
        setGoodsSubcategory(
            subcategory.map((item) => ({ ...item, checked: false }))
        )

    const applyFiltersAndClosePopup = () => {
        applyFilters()
        closePopup()
    }

    return (
        <div
            className={`${styles.catalog__bottom__filters} ${darkModeClass} ${
                filtersMobileOpen ? styles.open : ''
            }`}
        >
            <div className={styles.catalog__bottom__filters__inner}>
                <FiltersPopupTop
                    resetBtnText="Сбросить всё"
                    title="Фильтры"
                    resetFilters={resetFilter}
                    resetFilterBtnDisabled={resetFilterBtnDisabled}
                    closePopup={closePopup}
                />

                <div className={styles.filters__category}>
                    <button
                        className={`${styles.filters__catergory__btn} ${darkModeClass}`}
                        onClick={handleOpenCategories}
                    >
                        Категория товаров
                    </button>
                    <FiltersPopup
                        title="Категория товаров"
                        resetFilterBtnDisabled={!isAnyCategoryChecked}
                        updateCategory={updateGoodsCategory}
                        setCategory={setGoodsCategory}
                        applyFilters={applyFiltersAndClosePopup}
                        categoryList={category}
                        resetAllCategories={resetAllCategories}
                        handleClosePopup={handleCloseCategories}
                        openPopup={openCategory}
                    />
                </div>

                <div className={styles.filters__category}>
                    <button
                        className={`${styles.filters__catergory__btn} ${darkModeClass}`}
                        onClick={handleOpenSubcategories}
                    >
                        Категория товаров
                    </button>
                    <FiltersPopup
                        title="Подкатегории товаров"
                        resetFilterBtnDisabled={!isAnySubcategoryChecked}
                        updateCategory={updateGoodsSubcategory}
                        setCategory={setGoodsSubcategory}
                        applyFilters={applyFiltersAndClosePopup}
                        categoryList={subcategory}
                        resetAllCategories={resetAllSubcategories}
                        handleClosePopup={handleCloseSubcegories}
                        openPopup={opneSubcategory}
                    />
                </div>

                <div className={styles.filters__price}>
                    <Accordion
                        title="Цена"
                        titleClass={`${styles.filters__category__btn} ${darkModeClass}`}
                        hideArrowClass={styles.hide_arrow}
                        isMobileForFilters={isMobile}
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
            </div>

            <div className={styles.filters__actions}>
                <button
                    className={styles.filters__actions__show}
                    onClick={applyFiltersAndClosePopup}
                    disabled={resetFilterBtnDisabled}
                >
                    {spinner ? (
                        <span
                            className={spinnerStyles.spinner}
                            style={{ top: 6, left: '47%' }}
                        />
                    ) : (
                        'Показать'
                    )}
                </button>
            </div>
        </div>
    )
}

export default CatalogFiltersMobile
