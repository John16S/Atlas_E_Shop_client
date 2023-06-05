import { useStore } from "effector-react"
import { useEffect } from "react"
import { $mode, setMode } from "@/context/mode"

//*Хук для смены темы
export const useTheme = () => {
    const mode = useStore($mode)

    //*функция
    const toggleTheme = () => {
        if (mode === "dark") {  //Если dark
            localStorage.setItem('mode', JSON.stringify('light')) //меняем на light
            setMode('light')
        }
        else{
            localStorage.setItem('mode', JSON.stringify('dark')) //а иначе, меняем на dark
            setMode('dark')
        }
    }

    //*чтобы тема устанавливался после перезагрузки из localStorage
    useEffect(() => {
        //получаем локальную тему
        const localTheme = JSON.parse(localStorage.getItem('mode') as string)
        
        if(localTheme){ //если в localTheme есть значение
            setMode(localTheme)
        }   
    }, [])

    //!чтобы могли переключать тему в любом месте приложения
    return { toggleTheme } //!возращаем объект с полем toggleTheme 

}