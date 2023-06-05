//*Функция для закрытия блока Профиль при нажатия за пределами блока

import { IWrappedComponentProps } from "@/types/common"
import { ForwardRefExoticComponent, MutableRefObject, RefAttributes, useEffect, useRef, useState } from "react"

//!Функция высшего порядка, потому что сюда будем принимать компонент
export function withClickOutside(
    WrappedComponent: ForwardRefExoticComponent<
        IWrappedComponentProps & RefAttributes<HTMLDivElement>
    >
) {
    const Component = () => {
        const [open, setOpen] = useState(false)
        const ref = useRef() as MutableRefObject<HTMLDivElement>
    
        //*Обработчик клика на Document, чтобы при нажатии на пустое пространство наш блок закрылся
        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (!ref.current.contains(e.target as HTMLDivElement)) {
                setOpen(false)
                }
            }

            document.addEventListener('mousedown', handleClickOutside)

            return () => document.removeEventListener('mousedown', handleClickOutside)
        }, [ref])

        return <WrappedComponent open={open} setOpen={setOpen} ref={ref} />
        }
    return Component
}
