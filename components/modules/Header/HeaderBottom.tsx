import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import styles from '@/styles/header/header.module.scss'
import Link from 'next/link'
import SearchSvg from '@/components/elements/SearchSvg/SearchSvg'
import SearchInput from '@/components/elements/Header/SearchInput'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler'
import CartPopup from './CartPopup/CartPopup'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { setDisableCart } from '@/context/shopping-cart'

const HeaderBottom = () => {
    //для того чтоб переключатель theme при адаптиве ушел в бургерменю
    const isMedia950 = useMediaQuery(950)
    const router = useRouter()

    //стили для тёмный темы
    const mode = useStore($mode) //получаем доступ к состоянию mode
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    //*чтобы на странице заказа CartPopup не открывался
    useEffect(() => {
        if(router.pathname === '/order'){
            setDisableCart(true)
            return
        }

        setDisableCart(false)
    }, [router.pathname])

    return (
        <div className={styles.header__bottom}>
            <div className={`container ${styles.header__bottom__container}`}>
                <h1 className={styles.header__logo}>
                    <Link href="/home" legacyBehavior passHref>
                        <a className={styles.header__logo__link}>
                            <img src="/img/logo.png" />
                            <span
                                className={`${styles.header__logo__link__text} ${darkModeClass}`}
                            >
                                Атлас
                            </span>
                        </a>
                    </Link>
                </h1>

                <div className={styles.header__search}>
                    <SearchInput />
                    <button  className={`${styles.header__search__btn} ${darkModeClass}`}>
                        <span className={styles.header__search__btn__span}>
                            <SearchSvg />
                        </span>
                    </button>
                </div>

                <div  className={styles.header__shopping_cart}>
                    {!isMedia950 && <ModeToggler/>}
                    <CartPopup/>
                </div>
            </div>
        </div>
    )
}

export default HeaderBottom
