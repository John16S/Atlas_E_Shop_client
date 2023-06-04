import { useStore } from 'effector-react';
import { MutableRefObject, useRef } from 'react';   //Аутсорсные импорты были выше чем импортные
import { useMediaQuery } from '@/hooks/useMediaQuery';
import SignUpForm from '@/components/modules/AuthPage/SignUpForm'
import SignInForm from '@/components/modules/AuthPage/SignInForm';
import styles from '@/styles/auth/auth.module.scss'
import ModeToggler from '@/components/elements/ModeToggler/ModeToggler';
import { $mode } from '@/context/mode';

const AuthPage = () => {
    let switchCtn = useRef() as MutableRefObject<HTMLDivElement>    //используем хуки useRef()
    let switchC1 = useRef() as MutableRefObject<HTMLDivElement> 
    let switchC2 = useRef() as MutableRefObject<HTMLDivElement> 
    let switchCircle1 = useRef() as MutableRefObject<HTMLDivElement>
    let switchCircle2 = useRef() as MutableRefObject<HTMLDivElement>
    let aContainer = useRef() as MutableRefObject<HTMLDivElement>
    let bContainer = useRef() as MutableRefObject<HTMLDivElement>
    const isMedia800 = useMediaQuery(800)
    const mode = useStore($mode) //получаем доступ к состоянию mode
    //*если mode = dark, то...
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

    //*функция для анимации перехода форм
    const switchForm = () => {
        switchCtn.current.classList.add(styles.is_gx);
        setTimeout(() => {switchCtn.current.classList.remove(styles.is_gx);}, 1500)

        switchCtn.current.classList.toggle(styles.is_txr);
        switchCircle1.current.classList.toggle(styles.is_txr);
        switchCircle2.current.classList.toggle(styles.is_txr);
        switchC1.current.classList.toggle(styles.is_hidden);
        switchC2.current.classList.toggle(styles.is_hidden);
        aContainer.current.classList.toggle(styles.is_txl);
        bContainer.current.classList.toggle(styles.is_txl);
        bContainer.current.classList.toggle(styles.is_z200); 
    }

    return(
        <div className={`${styles.main} ${darkModeClass}`}>
            <div className={styles.mode_toggle}>
                <ModeToggler/>
            </div>
            <div ref={aContainer} className={`${styles.container} ${styles.a_container} ${darkModeClass}`}  id="a-container">
                <div className={styles.container__inner}>
                    <SignUpForm switchForm={switchForm}/>
                </div>  
            </div>

            <div ref={bContainer} className={`${styles.container} ${styles.b_container} ${darkModeClass}`} id="b-container">
                <div className={styles.container__inner}>
                    <SignInForm/>
                </div>
            </div>

            <div ref={switchCtn} className={`${styles.switch} ${darkModeClass}`} id="switch-ctn">
                <div ref={switchCircle1} className={`${styles.switch__circle} ${darkModeClass}`}></div>
                <div ref={switchCircle2} className={`${styles.switch__circle} ${styles.switch__circle__t} ${darkModeClass}`}></div>
                
                <div ref={switchC1} className={styles.switch__container} id="switch-c1">
                    {/* Показываем этот контент если ширина больше 800px */}
                    {!isMedia800 &&<>
                        <h2 className={`${styles.switch__title} ${styles.title} ${darkModeClass}`}>Добро пожаловать!</h2> 
                        <p className={`${styles.switch__description} ${styles.description} ${darkModeClass}`}> 
                            Чтобы оставаться на связи с нами, пожалуйста, войдите под своей личной информацией
                        </p>
                    </>}
                    <button onClick={switchForm} className={`${styles.switch__button} ${styles.button} ${styles.switch_btn} ${darkModeClass}`}>
                        SIGN IN
                    </button>  
                </div>
                
                <div ref={switchC2} className={`${styles.switch__container} ${styles.is_hidden}`} id="switch-c2"> 
                    {/* Показываем этот контент если ширина больше 800px */}
                    {!isMedia800 &&<>
                        <h2 className={`${styles.switch__title} ${styles.title} ${darkModeClass}`}>Здравствуй, друг!</h2>
                        <p className={`${styles.switch__description} ${styles.description} ${darkModeClass}`}>
                            Введите свои личные данные и начните путешествие в мире росскоши и комфорта!
                        </p>
                    </>}
                    <button onClick={switchForm} className={`${styles.switch__button} ${styles.button} ${styles.switch_btn} ${darkModeClass}`}>
                        SIGN UP
                    </button>
                </div>
            
            </div>
        </div>
    )
};

export default AuthPage