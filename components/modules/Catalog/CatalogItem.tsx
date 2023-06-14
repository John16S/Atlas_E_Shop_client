import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { IGood } from '@/types/goods'
import Link from 'next/link'
import { formatPrice } from '@/utils/common'
import { $shoppingCart } from '@/context/shopping-cart'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import styles from '@/styles/catalog/index.module.scss'
import spinnerStyles from '@/styles/spinner/spinner.module.scss'
import { toggleCartItem } from '@/utils/shopping-cart'
import { $user } from '@/context/user'
import { removeFromCartFx } from '@/app/api/shopping-cart'

const CatalogItem = ({ item }: { item: IGood }) => {
    //стили для тёмный темы
    const mode = useStore($mode) //получаем доступ к состоянию mode
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    
    const user = useStore($user) //получаем доступ к состоянию mode

    const shoppingCart = useStore($shoppingCart)
    const isInCart = shoppingCart.some((cartItem) => cartItem.goodId === item.id) //*Проверяем что товар находится в карзине?

    const spinner = useStore(removeFromCartFx.pending)

    const toggleToCart = () => toggleCartItem(user.userName, item.id, isInCart)

    return (
        <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
            <img src={JSON.parse(item.image)[0]} alt={item.name} />
            <div className={styles.catalog__list__item__inner}>
                <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
                    <h3 className={styles.catalog__list__item__title}>
                        {item.name}
                    </h3>
                </Link>

                <span className={styles.catalog__list__item__size}>
                    Размер: {item.size}
                </span>

                <span className={styles.catalog__list__item__size}>
                    {formatPrice(item.price)} P
                </span>

                <button 
                    className={`${styles.catalog__list__item__cart} ${isInCart ? styles.added : ''}`}
                    disabled={spinner}
                    onClick={toggleToCart}
                >
                    {spinner ? (
                        <div className={spinnerStyles.spinner} style={{top: 6, left: 6}}/>
                    ) : (
                        <span>
                            {isInCart ? <CartHoverCheckedSvg/> : <CartHoverSvg/>}
                        </span>
                    )}
                </button>
            </div>
        </li>
    )
}

export default CatalogItem
