import Link from 'next/link'
import LocationButton from '@/components/elements/locationButton/locationButton'
import ProfileDropDown from './ProfileDropDown'
import styles from '../../../styles/header/header.module.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { usePopup } from '@/hooks/usePopup'

const HeaderTop = () => {
    //для того чтоб переключатель theme при адаптиве ушел в бургерменю
    const isMedia950 = useMediaQuery(950)
    //получаем доступ к переменны из хука usePopup
    const {toggleOpen, open, closePopup} = usePopup()
    //стили для тёмный темы
    const mode = useStore($mode) //получаем доступ к состоянию mode
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    
    return(
        <div className={styles.header__top}>
            <div className={`container ${styles.header__top__container}`}>
                {!isMedia950 && <LocationButton/>}
                {/* Кнопка вызывающий бургерменю */}
                {isMedia950 && 
                    <button className={`${styles.burger_menu} ${open ? styles.open : ''} ${darkModeClass}`}
                            onClick={toggleOpen}>
                        <span/>
                        <span/>
                        <span/>
                    </button>}
                {/* Блок навигации */}
                <nav className={`${styles.header__nav} ${open ? styles.open : ''} ${darkModeClass}`}>
                    <ul className={styles.header__nav__list}>
                        <li className={styles.header__nav__list__item}>
                            {/*Ссылка на стр. Home */}
                            <Link href="/home" passHref legacyBehavior>
                                <a className={`${styles.header__nav__list__item__link} ${darkModeClass}`} onClick={closePopup}>
                                    Главная страница
                                </a>
                            </Link>
                        </li>
                        <li className={styles.header__nav__list__item}>
                            {/*Ссылка на стр. каталог */}
                            <Link href="/catalog" passHref legacyBehavior>
                                <a className={`${styles.header__nav__list__item__link} ${darkModeClass}`} onClick={closePopup}>
                                    Каталог товаров
                                </a>
                            </Link>
                        </li>
                        <li className={styles.header__nav__list__item}>
                            {/*Ссылка на стр. доставки и оплата */}
                            <Link href="/shipping-payment" passHref legacyBehavior>
                                <a className={`${styles.header__nav__list__item__link} ${darkModeClass}`} onClick={closePopup}>
                                    Доставка и оплата
                                </a>
                            </Link>
                        </li>
                        <li className={styles.header__nav__list__item}>
                            {/*Ссылка на стр. контакты */}
                            <Link href="/contacts" passHref legacyBehavior>
                                <a className={`${styles.header__nav__list__item__link} ${darkModeClass}`} onClick={closePopup}>
                                    Контакты
                                </a>
                            </Link>
                        </li>
                        <li className={styles.header__nav__list__item}>
                            {/*Ссылка на стр. о нас */}
                            <Link href="/about" passHref legacyBehavior>
                                <a className={`${styles.header__nav__list__item__link} ${darkModeClass}`} onClick={closePopup}>
                                    О нас
                                </a>
                            </Link>
                        </li>
                        {isMedia950 && (
                            <li className={styles.header__nav__list__item}>
                                <LocationButton/>
                            </li>
                        )}
                        {isMedia950 && (
                            <li className={styles.header__nav__list__item}>
                                <ModeToggler/>
                            </li>
                        )}
                    </ul>
                </nav>
                <ProfileDropDown/>
            </div>
        </div>
    )    
}

export default HeaderTop