import { useEffect, useState } from "react";

export const usePopup = () => {
    const [open, setOpen] = useState(false); //по умолчанию закрыто

    //*функция ктр тоглит open
    const toggleOpen = () => {
        window.scrollTo(0, 0)
        // добавляем классы
        document.querySelector('.overlay')?.classList.toggle('open')
        document.querySelector('.body')?.classList.toggle('overlay-hidden')
        setOpen(!open)
    }
    //*функция ктр закрывает бургерменю
    const closePopup = () => {
        // добавляем классы
        document.querySelector('.overlay')?.classList.remove('open')
        document.querySelector('.body')?.classList.remove('overlay-hidden')
        setOpen(false)
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
    return {toggleOpen, open, closePopup}
} 