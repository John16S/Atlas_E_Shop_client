import Link from 'next/link'
import styles from '@/styles/footer/index.module.scss'

const FooterLogo = () => (
    <div className={styles.footer__top__item}>
        <Link href="/home" legacyBehavior passHref>
            <a className={styles.footer__top__item__logo}>
                <img src="/img/logo.png" alt="logo" />
                <span className={styles.footer__top__item__logo__text}>
                    Одежда для всей семьи
                </span>
            </a>
        </Link>
    </div>
)

export default FooterLogo
