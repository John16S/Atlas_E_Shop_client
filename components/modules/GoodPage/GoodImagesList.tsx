import { useState } from 'react'
import { $good } from '@/context/good'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useStore } from 'effector-react'
import GoodImagesItem from './GoodImagesItem'
import styles from '@/styles/good/index.module.scss'
import GoodSlider from './GoodSlider'

const GoodImagesList = () => {
    const good = useStore($good)
    const isMobile = useMediaQuery(850)

    const images = good.image ? (JSON.parse(good.image) as string[]) : []

    const [currentImgSrc, setCurrentImgSrc] = useState('')

    return (
        <div className={styles.good__images}>
            {isMobile ? (
                <GoodSlider images={images} />
            ) : (
                <>
                    <div className={styles.good__images__main}>
                        <img src={currentImgSrc || images[0]} alt={good.name} />
                    </div>
                    <ul className={styles.good__images__list}>
                        {images.map((item, i) => (
                            <GoodImagesItem
                                key={i}
                                alt={`image-${i + 1}`}
                                callback={setCurrentImgSrc}
                                src={item}
                            />
                        ))}
                    </ul>
                </>
            )}
        </div>
    )
}

export default GoodImagesList
