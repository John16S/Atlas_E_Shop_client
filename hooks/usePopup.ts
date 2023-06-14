import { setSearchInputZIndex } from '@/context/header'
import {
    removeClassNamesForOverlayAndBody,
    toggleClassNamesForOverlayAndBody,
} from '@/utils/common'
import { useEffect, useState } from 'react'

export const usePopup = () => {
    const [open, setOpen] = useState(false) //по умолчанию закрыто

    //*функция ктр тоглит open
    const toggleOpen = () => {
        window.scrollTo(0, 0)
        // добавляем классы
        toggleClassNamesForOverlayAndBody()
        setOpen(!open)
    }
    //*функция ктр закрывает бургерменю
    const closePopup = () => {
        // добавляем классы
        removeClassNamesForOverlayAndBody()
        setOpen(false)
        setSearchInputZIndex(1)
    }

    //*[open] -в зависимость передадим состояние open
    useEffect(() => {
        //получаем лоступ к блоку overlay
        const overlay = document.querySelector('.overlay')

        //чтоб при нажатии на пустое пространство закрывался меню
        overlay?.addEventListener('click', closePopup)

        //при разбалансировании
        return () => overlay?.removeEventListener('click', closePopup)
    }, [open])

    //возвращаем из функции поля...
    return { toggleOpen, open, closePopup }
}
