/* eslint-disable @next/next/no-img-element */
import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import Link from 'next/link'
import DeleteSvg from '@/components/elements/DeleteSvg/DeleteSvg'
import { formatPrice } from '@/utils/common'
import CartItemCounter from '@/components/elements/CartItemCounter/CartItemCounter'
import { usePrice } from '@/hooks/usePrice'
import styles from '@/styles/cartPopup/cartPopup.module.scss'
import spinnerStyles from '@/styles/spinner/spinner.module.scss'
import { IShoppingCartItem } from '@/types/shopping-cart copy'
import { useState } from 'react'

const CartPopupItem = ({ item }: { item: IShoppingCartItem }) => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const spinnerDarkModeClass =
        mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`
    // const { price, spinner, decreasePrice, deleteCartItem, increasePrice } =
    //     usePrice(item.count, item.goodId, item.price)

    const [spinner, setSpinner] = useState(false)

    return (
        <li className={styles.cart__popup__list__item}>
            <div className={styles.cart__popup__list__item__top}>
                <div className={styles.cart__popup__list__item__img}>
                    <img src={item.image} alt={item.name} />
                </div>

                <Link href={`/catalog/${item.goodId}`} passHref legacyBehavior>
                    <a
                        className={`${styles.cart__popup__list__item__text} ${darkModeClass}`}
                    >
                        <span>
                            {item.name.replace('.', '')},{' '}
                            {item.category},{' '}
                            {item.subcategory}
                        </span>
                    </a>
                </Link>
                
                {/* onClick={deleteCartItem} */}
                {/*  */}
                <button>
                    <span>
                        {spinner ? (
                            <span
                                className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
                                style={{
                                    top: 0,
                                    left: 0,
                                    width: 20,
                                    height: 20,
                                }}
                            />
                        ) : (
                            <DeleteSvg />
                        )}
                    </span>
                </button>
            </div>


            <div className={styles.cart__popup__list__item__bottom}>
                {item.quantity === 0 ? (
                    <span className={styles.cart__popup__list__item__empty}>
                        Нет на складе
                    </span>
                ) : (
                    <div/>
                )}
                <span
                    className={`${styles.cart__popup__list__item__price} ${darkModeClass}`}
                >
                    {formatPrice(item.price)} P
                </span>
            </div>
        </li>
    )
}

export default CartPopupItem
// <CartItemCounter
                    //     totalCount={item.quantity}
                    //     partId={item.goodId}
                    //     initialCount={item.count}
                    //     increasePrice={increasePrice}
                    //     decreasePrice={decreasePrice}
                    // />