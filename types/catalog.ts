import { Event } from 'effector-next'

export interface ICategoryBlockProps {
    title: string
    event: Event<IFilterCheckboxItem>
    categoryList: IFilterCheckboxItem[]
}

export interface ICategoryBlockItemProps {
    item: IFilterCheckboxItem
    event: Event<IFilterCheckboxItem>
}

export interface IQueryParams {
    offset: string
    first: string
    category: string
    subcategory: string
    priceFrom: string
    priceTo: string
    //goodId: string
}

export interface IFilterCheckboxItem {
    title: string
    checked: boolean
    id?: string
    event: Event<IFilterCheckboxItem>
}

export interface IFilterCategoryAccordionProps {
    categoryList: IFilterCheckboxItem[]
    title: string | false
    setCategory: Event<IFilterCheckboxItem[]>
    updateCategory: Event<IFilterCheckboxItem>
}

export interface ICatalogFilterProps {
    priceRange: number[]
    setPriceRange: (arg0: number[]) => void
    setIsPriceRangeChanged: (arg0: boolean) => void
    resetFilterBtnDisabled: boolean
    resetFilter: VoidFunction
    isPriceRangeChanged: boolean
    currentPage: number
    setIsFilterInQuery: (arg0: boolean) => void
}
export interface IPriceRangeProps {
    priceRange: number[]
    setPriceRange: (arg0: number[]) => void
    setIsPriceRangeChanged: (arg0: boolean) => void
}

export interface ICatalogFilterDesktop {
    priceRange: number[]
    setPriceRange: (arg0: number[]) => void
    setIsPriceRangeChanged: (arg0: boolean) => void
    resetFilterBtnDisabled: boolean
    resetFilter: VoidFunction
    spinner: boolean
    applyFilters: VoidFunction
}

interface ICatalogBaseTypes {
    priceRange: number[]
    setPriceRange: (arg0: number[]) => void
    setIsPriceRangeChanged: (arg0: boolean) => void
}

interface ICatalogFiltersBaseTypes {
    resetFilterBtnDisabled: boolean
    resetFilters: VoidFunction
}

export interface ICatalogFiltersProps
    extends ICatalogBaseTypes,
        ICatalogFiltersBaseTypes {
    isPriceRangeChanged: boolean
    currentPage: number
    setIsFilterInQuery: (arg0: boolean) => void
    closePopup: VoidFunction
    filtersMobileOpen: boolean
}

export interface ICatalogFilterDesktopProps
    extends ICatalogBaseTypes,
        ICatalogFiltersBaseTypes {
    spinner: boolean
    applyFilters: VoidFunction
}

export interface ICatalogFilterMobileProps
    extends ICatalogBaseTypes,
        ICatalogFiltersBaseTypes {
    spinner: boolean
    applyFilters: VoidFunction
    closePopup: VoidFunction
    filtersMobileOpen: boolean
}

export interface IFiltersPopupTop {
    resetBtnText: string
    title: string
    resetFilters: VoidFunction
    resetFilterBtnDisabled: boolean
    closePopup: VoidFunction
}

export interface IFiltersPopupProps extends IFilterCategoryAccordionProps {
    resetFilterBtnDisabled: boolean
    resetAllCategories: VoidFunction
    handleClosePopup: VoidFunction
    applyFilters: VoidFunction
    openPopup: boolean
}
