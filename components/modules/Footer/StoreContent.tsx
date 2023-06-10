import Link from 'next/link'
import styles from '@/styles/footer/index.module.scss'

const StoreContent = () => (
    <ul className={styles.footer__top__item__list}>
        <li className={styles.footer__top__item__list__item}>
            <Link href='/about' legacyBehavior passHref>
                <a className={styles.footer__top__item__list__item__link}>
                    О нас
                </a>
            </Link>
        </li>
        <li className={styles.footer__top__item__list__item}>
            <Link href='/contacts' legacyBehavior passHref>
                <a className={styles.footer__top__item__list__item__link}>
                    Обратная связь 
                </a>
            </Link>
        </li>
        <li className={styles.footer__top__item__list__item}>
            <Link href='/contacts' legacyBehavior passHref>
                <a className={styles.footer__top__item__list__item__link}>
                    Контакты
                </a>
            </Link>
        </li>
    </ul>
)

export default StoreContent
