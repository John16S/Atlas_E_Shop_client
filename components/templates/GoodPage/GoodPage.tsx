import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { formatPrice } from '@/utils/common'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import spinnerStyles from '@/styles/spinner/spinner.module.scss'
import styles from '@/styles/good/index.module.scss'
import { $good } from '@/context/good'
import GoodImagesList from '@/components/modules/GoodPage/GoodImagesList'
import { $shoppingCart } from '@/context/shopping-cart'
import { useEffect, useState } from 'react'
import { toggleCartItem } from '@/utils/shopping-cart'
import { $user } from '@/context/user'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import GoodTabs from '@/components/modules/GoodPage/GoodTabs'
import HomeSlider from '@/components/modules/Home/HomeSlider'
import { getGoodsFx } from '@/app/api/goods'
import { $goods, setGoods, setGoodsByPopularity } from '@/context/goods'
import { toast } from 'react-toastify'
import GoodAccordion from '@/components/modules/GoodPage/GoodAccordion'
import { removeFromCartFx } from '@/app/api/shopping-cart'

const GoodPage = () => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    const good = useStore($good)
    const goods = useStore($goods)
    const user = useStore($user)
    const isMobile = useMediaQuery(850)
    // const cartItems = useStore($shoppingCart)
    // const spinnerToggleCart = useStore(removeFromCartFx.pending)
    const spinnerToggleCart = useStore(removeFromCartFx.pending)
    const spinnerSlider = useStore(getGoodsFx.pending)

    //*-------Есть ли товар в корзине-------------------
    const cartItems = useStore($shoppingCart) //получаем доступ к состоянию корзины
    const isInCart = cartItems.some((item) => item.goodId === good.id)
    //*--------------------------

    useEffect(() => {
        loadGood()
    }, [])

    const loadGood = async () => {
        try {
            const data = await getGoodsFx('/goods?limit=20&offset=0')

            setGoods(data)
            setGoodsByPopularity()
        } catch (e) {
            toast.error((e as Error).message)
        }
    }

    const toggleToCart = () =>
        toggleCartItem(user.userName, good.id, isInCart)

    return (
        <section>
            <div className="container">
                <div className={`${styles.good__top} ${darkModeClass}`}>
                    <h2 className={`${styles.good__title} ${darkModeClass}`}>
                        {good.name}
                    </h2>

                    <div className={styles.good__inner}>
                        <GoodImagesList />

                        <div className={styles.good__info}>
                            {/* Цена товара */}
                            <span
                                className={`${styles.good__info__price} ${darkModeClass}`}
                            >
                                {formatPrice(good.price || 0)} P
                            </span>

                            {/* Кол-во товара на складе */}
                            <span className={styles.good__info__quantity}>
                                {good.quantity > 0 ? (
                                    <span
                                        className={
                                            styles.good__info__quantity__success
                                        }
                                    >
                                        Есть на складе
                                    </span>
                                ) : (
                                    <span
                                        className={
                                            styles.good__info__quantity__not
                                        }
                                    >
                                        Нет на складе
                                    </span>
                                )}
                            </span>

                            {/* Размер товара */}
                            <span className={styles.good__info__size}>
                                Размер: {good.size}
                            </span>

                            {/* Кнопка добавить в карзину */}
                            <button
                                className={`${styles.good__info__btn} ${
                                    isInCart ? styles.in_cart : ''
                                }`}
                                onClick={toggleToCart}
                            >
                                {spinnerToggleCart ? (
                                    <span
                                        className={spinnerStyles.spinner}
                                        style={{ top: 10, left: '45%' }}
                                    />
                                ) : (
                                    <>
                                        <span
                                            className={
                                                styles.good__info__btn__icon
                                            }
                                        >
                                            {isInCart ? (
                                                <CartHoverCheckedSvg />
                                            ) : (
                                                <CartHoverSvg />
                                            )}
                                        </span>
                                        {isInCart ? (
                                            <span>Добавлено в карзину</span>
                                        ) : (
                                            <span>Положить в корзину</span>
                                        )}
                                    </>
                                )}
                            </button>

                            {!isMobile && <GoodTabs />}
                        </div>
                    </div>
                </div>

                {isMobile && (
                    <div className={styles.good__accordion}>
                        <div className={styles.good__accordion__inner}>
                            <GoodAccordion title="Описание">
                                <div
                                    className={`${styles.good__accordion__content} ${darkModeClass}`}
                                >
                                    <h3
                                        className={`${styles.good__tabs__content__title} ${darkModeClass}`}
                                    >
                                        {good.name}
                                    </h3>
                                    <p
                                        className={`${styles.good__tabs__content__text} ${darkModeClass}`}
                                    >
                                        {good.description}
                                    </p>
                                </div>
                            </GoodAccordion>
                        </div>
                    </div>
                )}

                <div className={styles.good__bottom}>
                    <h2 className={`${styles.good__title} ${darkModeClass}`}>
                        Вам также могут понравится:
                    </h2>
                    <HomeSlider
                        goToGoodPage
                        spinner={spinnerSlider}
                        items={goods.rows || []}
                    />
                </div>
            </div>
        </section>
    )
}

export default GoodPage
