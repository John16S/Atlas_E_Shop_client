import Select from "react-select"
import { $mode } from "@/context/mode"
import { useStore } from "effector-react"
import { useState } from "react"
import { SelectOptionType } from "@/types/common"
import { createSelectOption } from "@/utils/common"
import { controlStyles, menuStyles, selectStyles } from "@/styles/catalog/select"
import { optionStyles } from "@/styles/searchInput"
import { categoriesOptions } from "@/utils/selectContents"

const FilterSelect = () => {
    //стили для тёмный темы
    const mode = useStore($mode) //получаем доступ к состоянию mode
    
    const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)

    //*Функция для установки выбранного значения из выпадающего списка
    const handleCategoryOptionChange = (selectedOption: SelectOptionType) => {
        setCategoryOption(selectedOption)
    }

    // импортируем Select из библиотеки react-select
    return (
        <Select
            placeholder="Я ищу..."
            value={categoryOption || createSelectOption('Сначала дешевые')}
            onChange={handleCategoryOptionChange}
            styles={{
                ...selectStyles,
                control: (defaultStyles) => ({
                    ...controlStyles(defaultStyles, mode)
                }),
                input: (defaultStyles) => ({
                    ...defaultStyles,
                    color: mode === 'dark' ? '#f2f2f2' : '#222222'
                }),
                menu: (defaultStyles) => ({
                    ...menuStyles(defaultStyles, mode)
                }),
                option: (defaultStyles, state) => ({
                    ...optionStyles(defaultStyles, state, mode)
                }),
            }}
            isSearchable={false}
            options = {categoriesOptions}
        />
    )

}

export default FilterSelect