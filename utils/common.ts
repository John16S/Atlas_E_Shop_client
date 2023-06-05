
//*Функция для получения ширины браузера
export const getWindowWidth = () => {
    const { innerWidth: windowWidth } =
        typeof window !== 'undefined' ? window : { innerWidth: 0 }

    return { windowWidth }
}
