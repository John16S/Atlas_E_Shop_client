import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import Select from 'react-select'
import { useState } from 'react'
import { SelectOptionType } from '@/types/common'
import { controlStyles, inputStyles, menuStyles, optionStyles } from '@/styles/searchInput'

const SearchInput = () => {
    const mode = useStore($mode) //получаем доступ к состоянию mode
    const [searchOption, setSearchOption] = useState<SelectOptionType>(null)

    //*Функция для установки выбранного значения из выпадающего списка
    const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
        setSearchOption(selectedOption)
    }

    // импортируем Select из библиотеки react-select
    return (
        <Select
            placeholder="Я ищу..."
            value={searchOption}
            onChange={handleSearchOptionChange}
            styles={{
                ...inputStyles,
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
            isClearable = {true}
            openMenuOnClick = {false}
            options = {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => ({value: item, label: item})) }
        />
    )
}

export default SearchInput
