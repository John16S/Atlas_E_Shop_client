/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { $mode } from '@/context/mode'
import styles from '@/styles/good/index.module.scss'
import { $good } from '@/context/good'

const GoodTabs = () => {
  const mode = useStore($mode)
  const good = useStore($good)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const [showDescription, setShowDescription] = useState(true)

  //!Менять здесь если description не открывается
  const handleShowDescription = () => {
    setShowDescription(!showDescription);
  }

  return (
    <div className={styles.good__tabs}>
      <div className={`${styles.good__tabs__controls} ${darkModeClass}`}>
        <button
          className={showDescription ? styles.active : ''}
          onClick={handleShowDescription}
        >
          Описание
        </button>
      </div>
      {showDescription && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.good__tabs__content}
        >
          <h3
            className={`${styles.good__tabs__content__title} ${darkModeClass}`}
          >
            {good.name}
          </h3>
          <p className={`${styles.good__tabs__content__text} ${darkModeClass}`}>
            {good.description}
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default GoodTabs
