import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { motion } from 'framer-motion'
import { ICategoryBlockProps } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'

const CategoryBlock = ( {title}: ICategoryBlockProps ) => {
    //стили для тёмный темы
    const mode = useStore($mode) //получаем доступ к состоянию mode
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${styles.category} ${darkModeClass}`}
        >
            <h3 className={`${styles.category__title} ${darkModeClass}`}>
                {title}
            </h3>
            {/* ${darkModeClass} */}
            <ul className={`${styles.category__list} `}>
                {[].map((item) => (
                    <li key={item}></li>
                ))}
            </ul>
        </motion.div>
    )
}

export default CategoryBlock
