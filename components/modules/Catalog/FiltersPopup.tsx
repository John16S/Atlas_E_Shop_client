import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { IFiltersPopupProps } from '@/types/catalog'
import FiltersPopupTop from './FiltersPopupTop'
import styles from '@/styles/catalog/index.module.scss'
import FilterCategoryAccordion from './FilterCategoryAccordion'

const FiltersPopup = ({
  resetFilterBtnDisabled,
  resetAllCategories,
  handleClosePopup,
  updateCategory,
  setCategory,
  applyFilters,
  openPopup,
  title,
  categoryList,
}: IFiltersPopupProps) => {
  //стили для тёмный темы
  const mode = useStore($mode) //получаем доступ к состоянию mode
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div
      className={`${styles.filters__popup} ${darkModeClass} ${
        openPopup ? styles.open : ''
      }`}
    >
      <div className={styles.filters__popup__inner}>
        <FiltersPopupTop
          resetBtnText="Сбросить"
          title={title as string}
          resetFilterBtnDisabled={resetFilterBtnDisabled}
          resetFilters={resetAllCategories}
          closePopup={handleClosePopup}
        />
        <FilterCategoryAccordion
          categoryList={categoryList}
          title={false}
          updateCategory={updateCategory}
          setCategory={setCategory}
        />
      </div>
      {/* Buttons "Показать" и "Сбросить" */}
      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          disabled={resetFilterBtnDisabled}
          onClick={applyFilters}
          style={{ marginBottom: 12 }}
        >
          Показать
        </button>
        <button
          className={styles.filters__actions__reset}
          onClick={handleClosePopup}
        >
          Назад
        </button>
      </div>
    </div>
  )
}

export default FiltersPopup
