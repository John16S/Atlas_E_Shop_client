import styles from '../../../styles/header/header.module.scss'
import HeaderBottom from './HeaderBottom'
import HeaderTop from './HeaderTop'

const Header = () => (
    <header className={styles.header}>
        <HeaderTop/>
        <HeaderBottom/>
    </header>
)

export default Header