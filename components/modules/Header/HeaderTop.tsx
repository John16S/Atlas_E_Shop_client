import Link from 'next/link'
import LocationButton from '@/components/elements/locationButton/locationButton'
import ProfileDropDown from './ProfileDropDown'
import styles from '../../../styles/header/header.module.scss'

const HeaderTop = () => {
    console.log('')
    return(
        <div className={styles.header__top}>
            <div className={`container ${styles.header__top__container}`}>
                <LocationButton/>
                {/* Блок навигации */}
                <nav className={styles.header__nav}>
                    <ul className={styles.header__nav__list}>
                        <li className={styles.header__nav__list__item}>
                            {/*Ссылка на стр. Home */}
                            <Link href="/home" passHref legacyBehavior>
                                <a className={styles.header__nav__list__item__link}>
                                    Главная страница
                                </a>
                            </Link>
                        </li>
                        <li className={styles.header__nav__list__item}>
                            {/*Ссылка на стр. каталог */}
                            <Link href="/catalog" passHref legacyBehavior>
                                <a className={styles.header__nav__list__item__link}>
                                    Каталог товаров
                                </a>
                            </Link>
                        </li>
                        <li className={styles.header__nav__list__item}>
                            {/*Ссылка на стр. доставки и оплата */}
                            <Link href="/shipping-payment" passHref legacyBehavior>
                                <a className={styles.header__nav__list__item__link}>
                                    Доставка и оплата
                                </a>
                            </Link>
                        </li>
                        <li className={styles.header__nav__list__item}>
                            {/*Ссылка на стр. контакты */}
                            <Link href="/contacts" passHref legacyBehavior>
                                <a className={styles.header__nav__list__item__link}>
                                    Контакты
                                </a>
                            </Link>
                        </li>
                        <li className={styles.header__nav__list__item}>
                            {/*Ссылка на стр. о нас */}
                            <Link href="/about" passHref legacyBehavior>
                                <a className={styles.header__nav__list__item__link}>
                                    О нас
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <ProfileDropDown/>
            </div>
        </div>
    )    
}

export default HeaderTop