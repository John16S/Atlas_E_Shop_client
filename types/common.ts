import React from "react"
import { MultiValue, SingleValue } from "react-select"

export interface IWrappedComponentProps {
    open: boolean
    setOpen: (arg0: boolean) => void
}

//*Для поле Search в файле SearchInput.tsx
export interface IOption {
    value: string | number
    label: string | number
}
export type SelectOptionType = MultiValue<IOption> | SingleValue<IOption> | null


export interface IAccordion {
    children: React.ReactNode
    title: string | false
    titleClass: string
    arrowOpenClass: string
    isMobileForFilters?: boolean
    hideArrowClass?: string
    // boxShadowStyle?: string
    // callback?: (arg0: boolean) => void
}

//*Layout
export interface ILayout {
    //Мы передаём children и оборачиваем его header и footer-ом
    children: React.ReactNode
}