/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import styles from '@/styles/about/index.module.scss'

const AboutPage = () => {
    const mode = useStore($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <section className={styles.about}>
            <div className="container">
                <h2 className={`${styles.about__title} ${darkModeClass}`}>
                    О компании
                </h2>
                <div className={styles.about__inner}>
                    <div className={`${styles.about__info} ${darkModeClass}`}>
                        <p>
                            Магазин &quot;Атлас&quot; - это розничная торговая
                            точка, специализирующаяся на продаже
                            высококачественной одежды и обуви. Мы предлагаем
                            широкий ассортимент модных и стильных товаров для
                            женщин, мужчин и детей.
                        </p>
                        <p>
                            Наша цель - помочь нашим клиентам выглядеть стильно,
                            модно и уверенно, предоставляя им доступ к самым
                            последним трендам в мире моды. Мы постоянно следим
                            за новыми коллекциями и актуальными модными
                            направлениями, чтобы предложить нашим покупателям
                            лучший выбор.
                        </p>
                        <p>
                            В "Атласе" мы ценим качество и комфорт. Поэтому мы
                            тщательно отбираем каждый товар, работая только с
                            проверенными и надежными поставщиками. Наша одежда и
                            обувь изготовлены из высококачественных материалов,
                            обеспечивая комфорт и долговечность.
                        </p>
                        <p>
                            Мы стремимся создать уникальный и приятный опыт
                            покупок для наших клиентов. Наш дружелюбный и
                            профессиональный персонал всегда готов помочь вам
                            выбрать подходящий товар и ответить на ваши вопросы.
                            Мы ценим каждого клиента и стараемся обеспечить
                            высокий уровень обслуживания.
                        </p>
                        <p>
                            Приходите в "Атлас" и погрузитесь в мир моды и
                            стиля. Мы рады приветствовать вас в нашем магазине и
                            надеемся, что ваше посещение будет приятным и
                            удовлетворяющим. Благодарим вас за выбор "Атласа" и
                            надеемся стать вашим надежным партнером в покупках
                            одежды и обуви.
                        </p>
                    </div>
                    <div
                        className={`${styles.about__img} ${styles.about__img__top}`}
                    >
                        <img src="/img/about-img.png" alt="image-1" />
                    </div>
                    <div
                        className={`${styles.about__img} ${styles.about__img__bottom}`}
                    >
                        <img src="/img/about-img-2.png" alt="image-2" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutPage
