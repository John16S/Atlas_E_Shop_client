import { useEffect } from 'react'
import { useStore } from 'effector-react'
import { useTheme } from '@/hooks/useTheme'
import { $mode } from '@/context/mode'
import styles from '../../../styles/modeToggler/modeToggler.module.scss'

const ModeToggler = () => {
    const { toggleTheme } = useTheme() //получаем доступ к функции modeToggler
    const mode = useStore($mode) //получаем доступ к состоянию mode

    //*Функция
    const handleToggleMode = () => {
        toggleTheme()
        document.body.classList.toggle('dark_mode')
    }

    //чтобы также после перезагрузки стр. установился тема
    useEffect(() => {
        document.body.classList.add(mode === 'dark' ? 'dark_mode' : 'body') //проверяем если mode = dark, то устанавливаем класс dark_mode
    }, [])

    //из функции возвращаем JSX
    return (
        <div className={styles.theme}>
            <input
                className={styles.theme__input}
                type="checkbox"
                checked={mode === 'light'}
                onChange={handleToggleMode}
            />
        </div>
    )
}

export default ModeToggler