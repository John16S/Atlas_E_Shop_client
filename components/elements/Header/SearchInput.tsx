import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import Select from 'react-select'
import { MutableRefObject, useRef, useState } from 'react'
import { IOption, SelectOptionType } from '@/types/common'
import {
    controlStyles,
    inputStyles,
    menuStyles,
    optionStyles,
} from '@/styles/searchInput'
import {
    createSelectOption,
    removeClassNamesForOverlayAndBody,
    toggleClassNamesForOverlayAndBody,
} from '@/utils/common'
import { $searchInputZIndex, setSearchInputZIndex } from '@/context/header'
import { useRouter } from 'next/router'
import { getGoodByNameFx, searchGoodsFx } from '@/app/api/goods'
import SearchSvg from '../SearchSvg/SearchSvg'
import styles from '@/styles/header/header.module.scss'
import { defaultStyles } from 'react-select/dist/declarations/src/styles'
import { useDebounceCallback } from '@/hooks/useDebounceCallback'
import { IGood } from '@/types/goods'
import { toast } from 'react-toastify'
import {
    NoOptionsMessage,
    NoOptionsSpinner,
} from '../SelectOptionsMessage/SelectOptionsMessage'

const SearchInput = () => {
    const mode = useStore($mode) //получаем доступ к состоянию mode
    const zIndex = useStore($searchInputZIndex) //получаем доступ к состоянию mode
    const [searchOption, setSearchOption] = useState<SelectOptionType>(null)
    const [onMenuOpenControlStyles, setOnMenuOpenControlStyles] = useState({})
    const [onMenuOpenContainerStyles, setOnMenuOpenContainerStyles] = useState(
        {}
    )
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const btnRef = useRef() as MutableRefObject<HTMLButtonElement>
    const borderRef = useRef() as MutableRefObject<HTMLSpanElement>
    const [options, setOptions] = useState([])
    const [inputValue, setInputValue] = useState('')
    const delayCallback = useDebounceCallback(1000)
    const spinner = useStore(searchGoodsFx.pending)
    const router = useRouter()

    //*Функция для установки выбранного значения из выпадающего списка
    const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
        if (!selectedOption) {
            setSearchOption(null)
            return
        }

        const name = (selectedOption as IOption)?.value as string

        if (name) {
            getGoodAndRedirect(name)
        }

        setSearchOption(selectedOption)
        removeClassNamesForOverlayAndBody()
    }

    const onFocusSearch = () => {
        toggleClassNamesForOverlayAndBody('open-search')
        setSearchInputZIndex(100)
    }

    const handleSearchClick = async () => {
        if (!inputValue) {
            return
        }

        getGoodAndRedirect(inputValue)
    }

    const searchGood = async (search: string) => {
        try {
            setInputValue(search)
            const data = await searchGoodsFx({
                url: '/goods/search',
                search,
            })

            const names = data
                .map((item: IGood) => item.name)
                .map(createSelectOption)

            setOptions(names)
        } catch (e) {
            toast.error((e as Error).message)
        }
    }

    const getGoodAndRedirect = async (name: string) => {
        const good = await getGoodByNameFx({
            url: '/goods/searchByName',
            name,
        })

        if (!good.id) {
            toast.warning('Товар не найден.')
            return
        }

        router.push(`/catalog/${good.id}`)
    }

    const onSearchInputChange = (text: string) => {
        document.querySelector('.overlay')?.classList.add('open-search')
        document.querySelector('.body')?.classList.add('overflow-hidden')

        delayCallback(() => searchGood(text))
    }

    //*Done
    const onSearchMenuOpen = () => {
        setOnMenuOpenControlStyles({
            borderBottomLeftRadius: 0,
            border: 'none',
        })
        setOnMenuOpenContainerStyles({
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        })

        btnRef.current.style.border = 'none'
        btnRef.current.style.borderBottomRightRadius = '0'
        borderRef.current.style.display = 'block'
    }
    //*Done
    const onSearchMenuClose = () => {
        setOnMenuOpenControlStyles({
            borderBottomLeftRadius: 4,
            boxShadow: 'none',
            border: '1px solid #9e9e9e',
        })
        setOnMenuOpenContainerStyles({
            boxShadow: 'none',
        })

        btnRef.current.style.border = '1px solid #9e9e9e'
        btnRef.current.style.borderLeft = 'none'
        btnRef.current.style.borderBottomRightRadius = '4px'
        borderRef.current.style.display = 'none'
    }

    // импортируем Select из библиотеки react-select
    return (
        <>
            <div className={styles.header__search__inner}>
                <Select
                    components={{
                        NoOptionsMessage: spinner
                            ? NoOptionsSpinner
                            : NoOptionsMessage,
                    }}
                    placeholder="Я ищу..."
                    value={searchOption}
                    onChange={handleSearchOptionChange}
                    styles={{
                        ...inputStyles,
                        container: (defaultStyles) => ({
                            ...defaultStyles,
                            ...onMenuOpenContainerStyles,
                        }),
                        control: (defaultStyles) => ({
                            ...controlStyles(defaultStyles, mode),
                            backgroundColor:
                                mode === 'dark' ? '#2d2d2d' : '#ffffff',
                            zIndex,
                            transition: 'none',
                            ...onMenuOpenControlStyles,
                        }),
                        input: (defaultStyles) => ({
                            ...defaultStyles,
                            color: mode === 'dark' ? '#f2f2f2' : '#222222',
                        }),
                        menu: (defaultStyles) => ({
                            ...menuStyles(defaultStyles, mode),
                            zIndex,
                            marginTop: '-1px',
                        }),
                        option: (defaultStyles, state) => ({
                            ...optionStyles(defaultStyles, state, mode),
                        }),
                    }}
                    onFocus={onFocusSearch}
                    isClearable={true}
                    onMenuOpen={onSearchMenuOpen}
                    onMenuClose={onSearchMenuClose}
                    onInputChange={onSearchInputChange}
                    options={options}
                />
                <span
                    ref={borderRef}
                    className={styles.header__search__border}
                />
            </div>
            <button
                className={`${styles.header__search__btn} ${darkModeClass}`}
                ref={btnRef}
                style={{ zIndex }}
                onClick={handleSearchClick}
            >
                <span className={styles.header__search__btn__span}>
                    <SearchSvg />
                </span>
            </button>
        </>
    )
}

export default SearchInput
