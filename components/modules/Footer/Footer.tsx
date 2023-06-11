import FooterLogo from './FooterLogo'
import OnlineStoreContent from './OnlineStoreContent'
import StoreContent from './StoreContent'
import MarkerSvg from '@/components/elements/MarkerSvg/MarkerSvg'
import Link from 'next/link'
import PhoneSvg from '@/components/elements/PhoneSvg/PhoneSvg'
import MailSvg from '@/components/elements/MailSvg/MailSvg'
import styles from '@/styles/footer/index.module.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Accordion from '@/components/elements/Accordion/Accordion'

const Footer = () => {
    const isMedia750 = useMediaQuery(750)
    const isMedia500 = useMediaQuery(500)

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                {/* Footer-Top */}
                <div className={styles.footer__top}>
                    {!isMedia750 && <FooterLogo />}
                    <div className={styles.footer__top__inner}>
                        <div className={styles.footer__top__item}>
                            {!isMedia500 && 
                            <>
                                <h3 className={styles.footer__top__item__title}>
                                Информационный портал
                                </h3>
                                <OnlineStoreContent />
                            </>
                            }
                            {isMedia500 && (
                                <Accordion 
                                    title="Информационный портал"
                                    titleClass={styles.footer__top__item__title}
                                    arrowOpenClass={styles.open}>
                                    <OnlineStoreContent />
                                    <div style={{ height: 17 }}></div>
                                </Accordion>
                            )}
                        </div>

                        <div className={styles.footer__top__item}>
                        {!isMedia500 && 
                            <>
                                <h3 className={styles.footer__top__item__title}>
                                    Магазин
                                </h3>
                                <StoreContent />
                            </>
                        }
                        {isMedia500 && (
                            <Accordion 
                                title="Магазин"
                                titleClass={styles.footer__top__item__title}
                                arrowOpenClass={styles.open}>
                                <StoreContent />
                                <div style={{ height: 17 }}></div>
                            </Accordion>
                        )}
                        </div>
                    </div>
                    <div className={styles.footer__top__item}>
                    {!isMedia500 && 
                        <>
                            <h3 className={styles.footer__top__item__title}>
                                Контакты
                            </h3>
                            <ul className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}>
                                <li className={styles.footer__top__item__list}>
                                    <Link href={'/contacts'} passHref legacyBehavior>
                                        <a className={styles.footer__top__item__list__item__link}>
                                            <span>Наш адрес:</span>
                                            <span>г. Череповец, Кирилловское ш., 50А</span>
                                            <span><MarkerSvg/></span>
                                        </a>
                                    </Link>
                                </li>
                                <li className={styles.footer__top__item__list}>
                                    <a href='tel:+79637340982' className={styles.footer__top__item__list__item__link}>
                                        <span>Наш контактый телефон:</span>
                                        <span>+7 963-734-09-82</span>
                                        <span><PhoneSvg/></span>
                                    </a>
                                </li>
                                <li className={styles.footer__top__item__list}>
                                    <a href='mailto:atlas.che35@gmail.com' className={styles.footer__top__item__list__item__link}>
                                        <span>E-mail:</span>
                                        <span>atlas.che35@gmail.com</span>
                                        <span><MailSvg/></span>
                                    </a>
                                </li>
                            </ul>
                        </>
                    }
                    {isMedia500 && (
                        <Accordion 
                            title="Контакты"
                            titleClass={styles.footer__top__item__title}
                            arrowOpenClass={styles.open}>
                            <StoreContent />
                        </Accordion>
                    )}
                    </div>
                </div>

                {/* Footer-Bottom */}
                <div className={styles.footer__bottom}>
                    {/* PaymentCards and SocialMedia block */}
                    <div className={styles.footer__bottom__block}>
                        <div className={styles.footer__bottom__block__left}>
                            <h3 className={styles.footer__bottom__block__title}>
                                Мы принимаем к оплате:
                            </h3>
                            <ul className={styles.footer__bottom__block__pay}>
                                <li className={styles.footer__bottom__block__pay__item}>
                                    <img src="/img/visa.png" alt="visa" />
                                </li>
                                <li className={styles.footer__bottom__block__pay__item}>
                                    <img src="/img/master-card.png" alt="master" />
                                </li>
                                <li className={styles.footer__bottom__block__pay__item}>
                                    <img src="/img/mir.png" alt="mir" />
                                </li>
                            </ul>
                        </div>
                        <div className={styles.footer__bottom__block__right}>
                            <h3 className={styles.footer__bottom__block__title}>
                                Мы в соцсети:
                            </h3>
                            <ul className={styles.footer__bottom__block__social}>
                                <li className={styles.footer__bottom__block__social__item}>
                                    <a href="#" className={styles.footer__bottom__block__social__item_vk}></a>
                                </li>
                                <li className={styles.footer__bottom__block__social__item}>
                                    <a href="#" className={styles.footer__bottom__block__social__item_tg}></a>
                                </li>
                                <li className={styles.footer__bottom__block__social__item}>
                                    <a href="#" className={styles.footer__bottom__block__social__item_ytb}></a>
                                </li>
                                <li className={styles.footer__bottom__block__social__item}>
                                    <a href="#" className={styles.footer__bottom__block__social__item_wts}></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {isMedia750 && <FooterLogo/>}
                    {/* Copyright block */}
                    <div className={styles.footer__bottom__block}>
                        <p className={styles.footer__bottom__block__copyright}>
                            &copy; "Атлас - Магазин одежды и обуви для всей семьи, 2023."
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
