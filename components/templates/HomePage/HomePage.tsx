import { getBestsellersOrNewGoodsFx } from '@/app/api/goods'
import HomeSlider from '@/components/modules/HomePage/HomeSlider'   
import { $mode } from '@/context/mode'
import styles from '@/styles/home/index.module.scss'
import { IGoods } from '@/types/goods'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const HomePage = () => {
    //стили для тёмный темы
    const mode = useStore($mode) //получаем доступ к состоянию mode
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    //*Создаём состоянии для новинок и бестселлеров для получении их на прямую из сервера
    const [newGoods, setNewGoods] = useState<IGoods>({} as IGoods)
    const [bestsellers, setBestsellers] = useState<IGoods>({} as IGoods)
    const [spinner, setSpinner] = useState(false)

    //*Будем делать запрос на сервер
    const loadGoods = async () => {
        try {
            setSpinner(true)
            //делаем 2 запроса
            const bestsellers = await getBestsellersOrNewGoodsFx(
                '/goods/bestsellers'
            )
            const news = await getBestsellersOrNewGoodsFx('/goods/new')

            setNewGoods(news)
            setBestsellers(bestsellers)
        } catch (e) {
            toast.error((e as Error).message)
        } finally {
            setSpinner(false)
        }
    }

    //!Первый редеринг
    useEffect(() => {
        loadGoods()
    }, [])

    return (
        <section className={styles.home}>
            
            <h2 className={`${styles.home__title} ${darkModeClass}`}>
                Одежда для всей семьи
            </h2>

            <div className={styles.home__goods}>
                <h3 className={`${styles.home__goods__title} ${darkModeClass}`}>
                    Хиты продаж
                </h3>
                <HomeSlider items={bestsellers.rows || []} spinner={spinner} />
            </div>
            
            <div className={styles.home__goods}>
                <h3 className={`${styles.home__goods__title} ${darkModeClass}`}>
                    Новинки
                </h3>
                <HomeSlider items={newGoods.rows || []} spinner={spinner} />
            </div>
        </section>
    )
}

export default HomePage
