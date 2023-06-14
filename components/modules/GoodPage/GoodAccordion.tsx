/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import Accordion from '@/components/elements/Accordion/Accordion'
import { $mode } from '@/context/mode'
import styles from '@/styles/good/index.module.scss'
import { IGoodAccordionProps } from '@/types/good'

const GoodAccordion = ({ children, title }: IGoodAccordionProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  //*Функция при открытии accordion меняет border-radius
  const handleExpandAccordion = (expanded: boolean) => {
    const accordionTitles = document.querySelectorAll(
      `.${styles.good__accordion__title}`
    )

    accordionTitles.forEach((title) => {
      const item = title as HTMLElement

      if (!expanded) {
        item.style.borderBottomLeftRadius = '0'
        item.style.borderBottomRightRadius = '0'
      } else {
        item.style.borderBottomLeftRadius = '4px'
        item.style.borderBottomRightRadius = '4px'
      }
    })
  }

  return (
    <Accordion
      title={title}
      titleClass={`${styles.good__accordion__title} ${darkModeClass}`}
      arrowOpenClass={styles.open}
      boxShadowStyle="0px 2px 8px rgba(0, 0, 0, 0.1)"
      callback={handleExpandAccordion}
    >
      {children}
    </Accordion>
  )
}

export default GoodAccordion
