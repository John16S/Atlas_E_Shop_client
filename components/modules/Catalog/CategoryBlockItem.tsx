import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { motion } from 'framer-motion'
import { ICategoryBlockItemProps, IFilterCheckboxItem } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'
import DeleteSvg from '@/components/elements/DeleteSvg/DeleteSvg'

const CategoryBlockItem = ({ item, event }: ICategoryBlockItemProps) => {
    //стили для тёмный темы
    const mode = useStore($mode) //получаем доступ к состоянию mode
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    //*находим те эелементы которые checked :D
    const removeFilter = () =>
        event({ checked: !item.checked, id: item.id } as IFilterCheckboxItem)

    return (
        <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${styles.category__list__item} ${darkModeClass}`}
        >
            <span className={styles.category__list__item__text}>
                {item.title}
            </span>

            <button
                className={styles.category__list__item__btn}
                onClick={removeFilter}
            >
                <span>
                    <DeleteSvg />
                </span>
            </button>
        </motion.li>
    )
}

export default CategoryBlockItem
