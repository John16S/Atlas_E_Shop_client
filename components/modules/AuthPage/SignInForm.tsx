import { useRouter } from 'next/router';
import { useStore } from 'effector-react';
import { useForm } from 'react-hook-form'
import { IInputs } from '@/types/auth'
import NameInput from '@/components/elements/AuthPage/NameInput'
import styles from '@/styles/auth/auth.module.scss'
import spinnerStyles from '@/styles/spinner/spinner.module.scss'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { signInFx } from '@/app/api/auth'
import { useState } from 'react';
import { showOutError } from '@/utils/errors';
import { $mode } from '@/context/mode';

const SignInForm = () => {
    //*Спинер в кнопке во время загрузки
    const [spinner, setSpinner] = useState(false)
    const mode = useStore($mode) //получаем доступ к состоянию mode
    //*если mode = dark, то...
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const route = useRouter()

    //*Валидация для NameInput
    const {
        register,
        formState: { errors },
        handleSubmit,
        resetField,
    } = useForm<IInputs>() //IInput-интерфейс

    const onSubmit = async (data: IInputs) => {
        try{
            setSpinner(true)
            await signInFx({
                url: '/users/login',
                username: data.name,
                password: data.password,
            })

            resetField('name')
            resetField('password')
            route.push('/home') //!После успешного входе перекидываем user-а в страницу home
        }
        catch(e){
            showOutError(e) //*Выводим toast ошибку
        }
        finally{
            setSpinner(false)
        }
    }

    return (
        <form className={`${styles.form} ${darkModeClass}`}onSubmit={handleSubmit(onSubmit)}>
            <h2 className={`${styles.form_title} ${styles.title} ${darkModeClass}`}>
                Войти
            </h2>
            <NameInput register={register} errors={errors} />
            <PasswordInput register={register} errors={errors} />
            <button className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}>
                {spinner ? <div className={spinnerStyles.spinner}></div> : 'SIGN IN'}
            </button>
        </form>
    )
}

export default SignInForm