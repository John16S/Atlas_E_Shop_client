import { $mode } from "@/context/mode"
import { IFilterCheckboxItem } from "@/types/catalog"
import { useStore } from "effector-react"
import styles from '@/styles/catalog/index.module.scss'

const FilterCheckboxItem = ( {title, checked, id, event } :IFilterCheckboxItem ) => {
    //стили для тёмный темы
    const mode = useStore($mode) //получаем доступ к состоянию mode
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    
    //*handler для изменение состояние checkbox-a
    const handleFilterChange = () => 
        event({ checked: !checked, id } as IFilterCheckboxItem)


    return(
        <li className={`${styles.filtres__category__list__item} ${darkModeClass}`}>
            <label>
                <input type="checked" checked={checked} onChange={handleFilterChange}/>
                <span>{title}</span>
            </label>
        </li>
    )
}

export default FilterCheckboxItem