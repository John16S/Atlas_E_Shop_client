import { useForm } from 'react-hook-form'
import { IInputs } from '@/types/auth'
import { toast } from "react-toastify";
import NameInput from '@/components/elements/AuthPage/NameInput'
import styles from '@/styles/auth/auth.module.scss'
import spinnerStyles from '@/styles/spinner/spinner.module.scss'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { signUpFx } from '@/app/api/auth'
import { showOutError } from '@/utils/errors';
import { useState } from 'react';

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
    //*Спинер в кнопке во время загрузки
    const [spinner, setSpinner] = useState(false)
    
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
            const userData = await signUpFx({
                url: '/users/signup',
                username: data.name,
                email: data.email,
                password: data.password,
            })

            //*Чтобы не стработало анимация перехода при ошибки существующих user-ов 
            if(!userData){
                return
            }

            resetField('name')
            resetField('email')
            resetField('password')
            switchForm()
        }
        catch(e){
            showOutError(e)
        }
        finally{
            setSpinner(false)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={`${styles.form_title} ${styles.title}`}>
                Создать аккаунт
            </h2>
            <NameInput register={register} errors={errors} />
            <EmailInput register={register} errors={errors} />
            <PasswordInput register={register} errors={errors} />
            <button className={`${styles.form__button} ${styles.button} ${styles.submit}`}>
                {spinner ? <div className={spinnerStyles.spinner}></div> : 'SIGN UP'}
            </button>
        </form>
    )
}

export default SignUpForm