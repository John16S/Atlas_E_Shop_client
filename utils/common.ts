//*Функция для получения ширины браузера
export const getWindowWidth = () => {
    const { innerWidth: windowWidth } =
        typeof window !== 'undefined' ? window : { innerWidth: 0 }

    return { windowWidth }
}

//*Функция для форматировании цены на слайдере
export const formatPrice = (x: number) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
