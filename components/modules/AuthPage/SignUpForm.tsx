import { useForm } from 'react-hook-form'
import { IInputs } from '@/types/auth'
import NameInput from '@/components/elements/AuthPage/NameInput'
import styles from '@/styles/auth/auth.module.scss'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
    //*Валидация для NameInput
    const {
        register,
        formState: { errors },
        handleSubmit,
        resetField,
    } = useForm<IInputs>() //IInput-интерфейс

    const onSubmit = (data: IInputs) => {
        console.log(data)
        resetField('name')
        resetField('email')
        resetField('password')
        switchForm()
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
                SIGN UP
            </button>
        </form>
    )
}

export default SignUpForm