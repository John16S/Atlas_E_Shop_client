import { IGoodImagesItemProps } from '@/types/good'
import styles from '@/styles/good/index.module.scss'

const GoodImagesItem = ({ src, callback, alt }: IGoodImagesItemProps) => {
  const changeMainImage = () => callback(src)

  return (
    <li className={styles.good__images__list__item} onClick={changeMainImage}>
      <img src={src} alt={alt} />
    </li>
  )
}

export default GoodImagesItem
