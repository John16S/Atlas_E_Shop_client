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
    goodId: string
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

interface ICatalogBaseTypes {
    priceRange: number[]
    setPriceRange: (arg0: number[]) => void
    setIsPriceRangeChanged: (arg0: boolean) => void
}
interface ICatalogFilterBaseTypes {
    resetFilterBtnDisabled: boolean
    resetFilter: VoidFunction
}

export interface ICatalogFilterProps
    extends ICatalogBaseTypes,
        ICatalogFilterBaseTypes {
    isPriceRangeChanged: boolean
    currentPage: number
    setIsFilterInQuery: (arg0: boolean) => void
    closePopup: VoidFunction
    filtersMobileOpen: boolean
}

export type IPriceRangeProps = ICatalogBaseTypes

export interface ICatalogFilterDesktop
    extends ICatalogBaseTypes,
        ICatalogFilterBaseTypes {
    spinner: boolean
    applyFilters: VoidFunction
}

export interface ICatalogFilterMobile
    extends ICatalogBaseTypes,
        ICatalogFilterBaseTypes {
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
