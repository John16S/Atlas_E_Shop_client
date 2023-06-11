import { INewsSliderArrow } from '@/types/elements'
import SliderArrowSvg from '../SliderArrow/SliderArrow'
import styles from '@/styles/home/index.module.scss'

const NewsSliderNextArrow = (props: INewsSliderArrow) => (
    <button
        className={`${styles.home__news__slider__arrow} ${styles.home__news__slider__arrow_next} ${props.modeClass}`}
        onClick={props.onClick}
    >
        <span>
            <SliderArrowSvg />
        </span>
    </button>
)

export default NewsSliderNextArrow
