import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/contacts/index.module.scss'
import MailSvg from '@/components/elements/MailSvg/MailSvg'
import FeedbackForm from '@/components/modules/FeedbackForm/FeedbackForm'

const ContactsPage = () => {
  const mode = useStore($mode)
  const isMobile560 = useMediaQuery(560)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <section className={styles.contacts}>
      <div className="container">
        <h2 className={`${styles.contacts__title} ${darkModeClass}`}>
          Контакты
        </h2>
        <div className={styles.contacts__inner}>
            <ul className={`${styles.contacts__list} ${darkModeClass}`}>
              <li className={styles.contacts__list__title}>
                <h3 className={darkModeClass}>
                  Магазин одежды и обуви для всей семьи
                </h3>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>Наш адрес:</span>
                <span> г. Череповец, Кирилловское ш., 50А</span>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>График работы:</span>
                <span> пн-пс: с 9:00 до 21:00</span>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>Наш контактный телефон:</span>
                <span> +7 963-734-09-82</span>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>Прием заказов электронным способом на сайте:</span>
                <span> круглосуточно</span>
              </li>
              <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
                <span>E-mail:</span>
                <span className={styles.contacts__list__item__mail}>
                  {!isMobile560 && <MailSvg />}{' '}
                  <span>atlas.che35@gmail.com</span>
                </span>
              </li>
            </ul>
          <FeedbackForm />
        </div>
      </div>
    </section>
  )
}

export default ContactsPage
