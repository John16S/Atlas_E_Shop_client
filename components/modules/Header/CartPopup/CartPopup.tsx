import { useStore } from 'effector-react'
import { forwardRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { $mode } from '@/context/mode'
import styles from '@/styles/cartPopup/cartPopup.module.scss'
import { IWrappedComponentProps } from '@/types/common'
import { withClickOutside } from '@/utils/withClickOutside'
import ShoppingCartSvg from '@/components/elements/ShoppingCartSvg/ShoppingCartSvg'
import {
    $disableCart,
    $shoppingCart,
    $totalPrice,
    setShoppingCart,
    setTotalPrice,
} from '@/context/shopping-cart'
import Link from 'next/link'
import CartPopupItem from './CartPopupItem'
import { getCartItemsFx } from '@/app/api/shopping-cart'
import { toast } from 'react-toastify'
import { $user } from '@/context/user'
import { formatPrice } from '@/utils/common'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
    ({ open, setOpen }, ref) => {
        const shoppingCart = useStore($shoppingCart) //получаем доступ к состоянию $shoppingCart
        //стили для тёмный темы
        const mode = useStore($mode) //получаем доступ к состоянию mode
        const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
        
        const disableCart = useStore($disableCart) //получаем доступ к состоянию mode
        const user = useStore($user) //получаем доступ к состоянию user
        const totalPrice = useStore($totalPrice) //получаем доступ к состоянию totalPrice

        const toggleCartDropDown = () => setOpen(!open)

        useEffect(() => {
            loadCartItems()
        }, [])
        //*ктр следит постоянно за totalPrice и обновляет это поле
        useEffect(() => {
            setTotalPrice(
                //будем подсчитывать поле totalPrice для каждого item
                shoppingCart.reduce(
                    (defaultCount, item) => defaultCount + item.totalPrice,
                    0
                )
            )
        }, [shoppingCart])

        const loadCartItems = async () => {
            try {
                const cartItems = await getCartItemsFx(
                    `/shopping-cart/${user.userId}`
                )

                setShoppingCart(cartItems)
            } catch (e) {
                toast.error((e as Error).message)
            }
        }

        return (
            <div className={styles.cart} ref={ref}>
                {disableCart ? (
                <button
                    className={`${styles.cart__btn} ${darkModeClass}`}
                    style={{cursor: 'auto'}}
                >
                    <span className={styles.cart__svg}>
                        <ShoppingCartSvg />
                    </span>
                    <span className={styles.cart__text}>Корзина</span>
                </button>
                ) : (
                    <button
                        className={`${styles.cart__btn} ${darkModeClass}`}
                        onClick={toggleCartDropDown}
                        >
                        {/* Здесь по мимо 2 спанов будет условный рендеринг */}
                        {/* С помощью двойное неравенство значение shoppingCart переобразовываем в bool */}
                        {!!shoppingCart.length && (
                            <span className={styles.cart__btn__count}>
                                {shoppingCart.length}
                            </span>
                        )}
                        <span className={styles.cart__svg}>
                            <ShoppingCartSvg />
                        </span>
                        <span className={styles.cart__text}>Корзина</span>
                    </button>
                )}

                <AnimatePresence>
                    {open && (
                        <motion.ul
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 1, scale: 1 }}
                            className={`${styles.cart__popup} ${darkModeClass}`}
                            style={{ transformOrigin: 'right top' }}
                        >
                            <h3 className={styles.cart__popup__title}>
                                Корзина
                            </h3>
                            <ul className={styles.cart__popup__list}>
                                {/* Проверяем если shoppingCart что то есть, то проходим по массиву и отрисовываем элементы li 
                                                             а иначе выводим корзина пуста */}

                                {shoppingCart.length ? (
                                    shoppingCart.map((item) => (
                                        <CartPopupItem
                                            key={item.id}
                                            item={item}
                                        />
                                    ))
                                ) : (
                                    <li className={styles.cart__popup__empty}>
                                        <span
                                            className={`${styles.cart__popup__empty__text} ${darkModeClass}`}
                                        >
                                            Корзина пуста
                                        </span>
                                    </li>
                                )}
                            </ul>

                            {/* Footer где totalPrice... */}
                            <div className={styles.cart__popup__footer}>
                                <div
                                    className={
                                        styles.cart__popup__footer__total
                                    }
                                >
                                    <span
                                        className={`${styles.cart__popup__footer__text} ${darkModeClass}`}
                                    >
                                        Общая сумма:
                                    </span>
                                    <span
                                        className={
                                            styles.cart__popup__footer__price
                                        }
                                    >
                                        {formatPrice(totalPrice)} P
                                    </span>
                                </div>

                                <Link href="/order" passHref legacyBehavior>
                                    <button
                                        className={
                                            styles.cart__popup__footer__btn
                                        }
                                        disabled={!shoppingCart.length}
                                    >
                                        Оформить заказ
                                    </button>
                                </Link>
                            </div>
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        )
    }
)

CartPopup.displayName = 'ProfileDropDown'

export default withClickOutside(CartPopup)
