import { useStore } from "effector-react"
import LocationSvg from "../LocationSvg/LocationSvg"
import styles from '../../../styles/locationButton/locationButton.module.scss'
import { $mode } from "@/context/mode"

const LocationButton = () => {
    const mode = useStore($mode) //получаем доступ к состоянию mode
    //*если mode = dark, то...
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    
    return(
        <button className={styles.location}>
            <span className={`${styles.location__span} ${darkModeClass}`}>
                <LocationSvg/>
            </span>
            <span className={`${styles.location__text} ${darkModeClass}`}>
                Cherepovets
            </span>
        </button>
    )
}

export default LocationButton