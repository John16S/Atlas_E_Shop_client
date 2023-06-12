import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IFilterCategoryAccordionProps } from '@/types/catalog'
import Accordion from '@/components/elements/Accordion/Accordion'
import styles from '@/styles/catalog/index.module.scss'
import FilterCheckboxItem from './FilterCheckboxItem'

const FilterCategoryAccordion = ({
    categoryList,
    title,
    setCategory,
    updateCategory,
}: IFilterCategoryAccordionProps) => {
    //стили для тёмный темы
    const mode = useStore($mode) //получаем доступ к состоянию mode
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const isMobile = useMediaQuery(820)

    //*Функция для выбора всех chexkbox-ов
    const chooseAllCategories = () =>
        setCategory(categoryList.map((item) => ({ ...item, checked: true })))

    return (
        <Accordion
            title={title}
            titleClass={`${styles.filters__category__btn} ${darkModeClass}`}
            arrowOpenClass={styles.open}
            isMobileForFilters={isMobile}
            hideArrowClass={isMobile ? styles.hide_arrow : ''}
        >
            <div className={styles.filters__category__inner}>
                <button
                    className={styles.filters__category__select_all}
                    onClick={chooseAllCategories}
                >
                    Выбрать все
                </button>

                <ul className={styles.filters__category__list}>
                    {categoryList.map((item) => (
                        <FilterCheckboxItem
                            title={item.title}
                            id={item.id}
                            key={item.id}
                            checked={item.checked}
                            event={updateCategory}
                        />
                    ))}
                </ul>

                <div style={{ height: 24 }} />
            </div>
        </Accordion>
    )
}

export default FilterCategoryAccordion
