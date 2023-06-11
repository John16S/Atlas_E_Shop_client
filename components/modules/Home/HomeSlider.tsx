import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css' //!Стили для каруселя
import 'slick-carousel/slick/slick-theme.css' //!Стили для каруселя
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useEffect } from 'react'
import NewsSliderNextArrow from '@/components/elements/SliderNextArrow/SliderNextArrow'
import NewsSliderPrevArrow from '@/components/elements/SliderPrevArrow/SliderPrevArrow'
import { IHomeSlider } from '@/types/home'
import styles from '@/styles/home/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import Link from 'next/link'
import { formatPrice } from '@/utils/common'

const HomeSlider = ({ items, spinner, goToGoodPage }: IHomeSlider) => {
    const isMedia768 = useMediaQuery(768)
    const isMedia1366 = useMediaQuery(1366)
    const isMedia1030 = useMediaQuery(1030)
    const isMedia800 = useMediaQuery(800)
    const isMedia560 = useMediaQuery(560)
    //стили для тёмный темы
    const mode = useStore($mode) //получаем доступ к состоянию mode
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    useEffect(() => {
        //получаем доступ к сдлайдеру
        const slider = document.querySelectorAll(`.${styles.home__slider}`)

        slider.forEach((item) => {
            const list = item.querySelector('.slick-list') as HTMLElement

            list.style.height = isMedia560 ? '276px' : '390'    //для мобилки 
            list.style.padding = '0 5px' 
            list.style.marginRight = isMedia560 ? '-8px' : isMedia800 ? '-15px' : '0' 
        })

    }, [isMedia560, isMedia800])

    const settings = {
        className: 'center',
        centerMode: true,
        infinite: true,
        variableWidth: true,
        centerPadding: '60px',
        autoplay: true,
        speed: 500,
        nextArrow: <NewsSliderNextArrow modeClass={darkModeClass}/>,
        prevArrow: <NewsSliderPrevArrow modeClass={darkModeClass}/>,
        slidesToScroll: isMedia768 ? 1 : 2
    }

    const width = {
        width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344
    }

    return (
        <Slider {...settings} className={styles.home__slider}>
            {spinner? (
                [...Array(8)].map( (_, i) => (
                    <div className={`${skeletonStyles.skeleton__item} ${mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''}`} 
                        key={i} style={width}
                    >
                        <div className={skeletonStyles.skeleton__item__light}/>
                    </div>
                ))
            ) : items.length ? (
                items.map( (item) => (
                    <div className={`${styles.home__slide} ${darkModeClass}`} key={item.id} style={width}> 
                        <img src={JSON.parse(item.image)[0]} alt={item.name} />
                        <div className={styles.home__slide__inner}>
                            <Link href={goToGoodPage ? `/catalog/${item.id}` : '/catalog'} legacyBehavior passHref>
                                <a href="">
                                    <h3 className={styles.home__slide__title}>
                                        {item.name}
                                    </h3>
                                </a>
                            </Link>
                            <span className={styles.home__slide__size}>
                                Размер: {item.size}
                            </span>
                            <span className={styles.home__slide__price}>
                                {formatPrice(item.price)} P
                            </span>
                        </div>
                    </div>
                ) )
            ) : 
            (<span>Список товаров пуст</span>)
            }
        </Slider>
    )
}

export default HomeSlider
