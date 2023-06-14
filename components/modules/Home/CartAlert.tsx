import { $mode } from '@/context/mode'
import { ICartAlertProps } from '@/types/home'
import { useStore } from 'effector-react'
import styles from '@/styles/home/index.module.scss'
import { formatPrice } from '@/utils/common'
import Link from 'next/link'
import { $totalPrice } from '@/context/shopping-cart'

const CartAlert = ({ count, closeAlert }: ICartAlertProps) => {
    //стили для тёмный темы
    const mode = useStore($mode) //получаем доступ к состоянию mode
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    
    const totalPrice = useStore($totalPrice) //получаем доступ к состоянию totalPrice
    //для провильного отображения "товар-товара-товаров"
    const showCountMessage = (count: string) => {
        if (count.endsWith('1')) return 'товар'
        if (count.endsWith('2') || count.endsWith('3') || count.endsWith('4'))
            return 'товара'
        return 'товаров'
    }

    return (
        <>
            <div className={`${styles.home__alert__left} ${darkModeClass}`}>
                <span>
                    В корзине {count} {showCountMessage(`${count}`)}
                </span>
                <span>На сумму: {formatPrice(totalPrice)} Р</span>
            </div>

            <div className={styles.home__alert__right}>
                <Link href="/order" legacyBehavior passHref>
                    <a className={styles.home__alert__btn_cart}>
                        Перейти в корзину
                    </a>
                </Link>
                <Link href="/order" legacyBehavior passHref>
                    <a className={styles.home__alert__btn_order}>
                        Оформить заказ
                    </a>
                </Link>
            </div>

            <button
                className={styles.home__alert__btn_close}
                onClick={closeAlert}
            />
        </>
    )
}

export default CartAlert
