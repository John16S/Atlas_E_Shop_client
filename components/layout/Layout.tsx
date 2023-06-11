import { ILayout } from '@/types/common'
import Header from '../modules/Header/Header'
import Footer from '../modules/Footer/Footer'

const Layout = ({ children }: ILayout) => (
    <>
        <Header />
        {children}
        <Footer />
    </>
)

export default Layout