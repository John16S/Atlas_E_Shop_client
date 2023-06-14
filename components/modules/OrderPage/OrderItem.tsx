/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import Link from 'next/link'
import { IShoppingCartItem } from '@/types/shopping-cart'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { $mode } from '@/context/mode'
import CartItemCounter from '@/components/elements/CartItemCounter/CartItemCounter'
import { formatPrice } from '@/utils/common'
import spinnerStyles from '@/styles/spinner/spinner.module.scss'
import styles from '@/styles/order/index.module.scss'
import { usePrice } from '@/hooks/usePrice'

const OrderItem = ({ item }: { item: IShoppingCartItem }) => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const isMedia1160 = useMediaQuery(1160)
    const spinnerDarkModeClass =
        mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`

    const { price, spinner, decreasePrice, deleteCartItem, increasePrice } =
        usePrice(item.count, item.goodId, item.price)

    return (
        <li className={styles.order__cart__list__item}>

            {/* Левая часть */}
            <div className={styles.order__cart__list__item__left}>
                
                <div className={styles.order__cart__list__item__left__inner}>
                    
                    <div className={styles.order__cart__list__item__img}>
                        <img src={item.image} alt={item.name} />
                    </div>

                    <Link
                        href={`/catalog/${item.goodId}`}
                        passHref
                        legacyBehavior
                    >
                        <a
                            className={`${styles.order__cart__list__item__text} ${darkModeClass}`}
                        >
                            <span>
                                {item.name.replace('.', '')}, {item.category},{' '}
                                {item.subcategory}
                            </span>
                        </a>
                    </Link>

                </div>

                {isMedia1160 &&
                    (item.quantity === 0 ? (
                        <span className={styles.order__cart__list__item__empty}>
                            Нет на складе
                        </span>
                    ) : (
                        <CartItemCounter
                            totalCount={item.quantity}
                            goodId={item.goodId}
                            initialCount={item.count}
                            increasePrice={increasePrice}
                            decreasePrice={decreasePrice}
                        />
                ))}

            </div>

            {/* Правая часть */}
            <div className={styles.order__cart__list__item__right}>

                {!isMedia1160 &&
                  (item.quantity === 0 ? (
                      <span className={styles.order__cart__list__item__empty}>
                          Нет на складе
                      </span>
                  ) : (
                      <CartItemCounter
                          totalCount={item.quantity}
                          goodId={item.goodId}
                          initialCount={item.count}
                          increasePrice={increasePrice}
                          decreasePrice={decreasePrice}
                      />
                ))}
                
                <span
                    className={`${styles.order__cart__list__item__price} ${darkModeClass}`}
                >
                    {formatPrice(price)} P
                </span>
                
                <button
                    className={styles.order__cart__list__item__delete}
                    onClick={deleteCartItem}
                >
                    {spinner ? (
                        <span
                            className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
                            style={{
                                top: '-13px',
                                left: '-30px',
                                width: 25,
                                height: 25,
                            }}
                        />
                    ) : (
                        'Удалить'
                    )}
                </button>
            </div>

        </li>
    )
}

export default OrderItem
