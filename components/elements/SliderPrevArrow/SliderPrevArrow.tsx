import { INewsSliderArrow } from '@/types/elements'
import NewsSliderArrowSvg from '../SliderArrow/SliderArrow'
import styles from '@/styles/home/index.module.scss'

const NewsSliderPrevArrow = (props: INewsSliderArrow) => (
    <button
        className={`${styles.home__news__slider__arrow} ${styles.home__news__slider__arrow_prev} ${props.modeClass}`}
        onClick={props.onClick}
    >
        <span>
            <NewsSliderArrowSvg />
        </span>
    </button>
)

export default NewsSliderPrevArrow
