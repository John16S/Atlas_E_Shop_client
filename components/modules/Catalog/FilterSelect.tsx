import Select from 'react-select'
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { IOption, SelectOptionType } from '@/types/common'
import { createSelectOption } from '@/utils/common'
import {
    controlStyles,
    menuStyles,
    selectStyles,
} from '@/styles/catalog/select'
import { optionStyles } from '@/styles/searchInput'
import { categoriesOptions } from '@/utils/selectContents'
import {
    $goods,
    setGoodsByPopularity,
    setGoodsCheapFirst,
    setGoodsExpensiveFirst,
} from '@/context/goods'
import { useRouter } from 'next/router'

const FilterSelect = ({
    setSpinner,
}: {
    setSpinner: (arg0: boolean) => void
}) => {
    const router = useRouter()
    //стили для тёмный темы
    const mode = useStore($mode) //получаем доступ к состоянию mode

    const goods = useStore($goods) //получаем доступ к состоянию mode

    const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)

    useEffect(() => {
        if (goods.rows) {
            //Если товары уже загрузились из сервера...
            //только тогда делать сортировку
            switch (router.query.first) {
                case 'cheap':
                    updateCategoryOption('Сначала дешевые')
                    setGoodsCheapFirst()
                    break
                case 'expensive':
                    updateCategoryOption('Сначала дорогие')
                    setGoodsExpensiveFirst()
                    break
                case 'popular':
                    updateCategoryOption('По популярности')
                    setGoodsByPopularity()
                    break

                default:
                    updateCategoryOption('Сначала дешевые')
                    setGoodsCheapFirst()
                    break
            }
        }
    }, [goods.rows, router.query.first])

    //*Фнкция чтобы поле сортировки сохранял свое значение при перезпгрузки
    const updateCategoryOption = (value: string) =>
        setCategoryOption({ value, label: value })

    //*Функция чтобы при перезагрузки стр. сохраился наша сортировка
    const updateRouteParam = (first: string) =>
        router.push(
            {
                query: {
                    ...router.query,
                    first,
                },
            },
            undefined,
            { shallow: true }
        )

    //*Функция для установки выбранного значения из выпадающего списка сортировки
    const handleSortOptionChange = (selectedOption: SelectOptionType) => {
        setSpinner(true)
        setCategoryOption(selectedOption)

        switch ((selectedOption as IOption).value) {
            case 'Сначала дешевые':
                setGoodsCheapFirst()
                updateRouteParam('cheap')
                break
            case 'Сначала дорогие':
                setGoodsExpensiveFirst()
                updateRouteParam('expensive')
                break
            case 'По популярности':
                setGoodsByPopularity()
                updateRouteParam('popular')
                break

            default:
                break
        }

    setTimeout(() => setSpinner(false), 1000)
    }

    // импортируем Select из библиотеки react-select
    return (
        <Select
            placeholder="Я ищу..."
            value={categoryOption || createSelectOption('Сначала дешевые')}
            onChange={handleSortOptionChange}
            styles={{
                ...selectStyles,
                control: (defaultStyles) => ({
                    ...controlStyles(defaultStyles, mode),
                }),
                input: (defaultStyles) => ({
                    ...defaultStyles,
                    color: mode === 'dark' ? '#f2f2f2' : '#222222',
                }),
                menu: (defaultStyles) => ({
                    ...menuStyles(defaultStyles, mode),
                }),
                option: (defaultStyles, state) => ({
                    ...optionStyles(defaultStyles, state, mode),
                }),
            }}
            isSearchable={false}
            options={categoriesOptions}
        />
    )
}

export default FilterSelect
