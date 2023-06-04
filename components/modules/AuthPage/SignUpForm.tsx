import { useForm } from 'react-hook-form'
import { IInputs } from '@/types/auth'
import { toast } from "react-toastify";
import NameInput from '@/components/elements/AuthPage/NameInput'
import styles from '@/styles/auth/auth.module.scss'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { signUpFx } from '@/app/api/auth'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
    //*Валидация для NameInput
    const {
        register,
        formState: { errors },
        handleSubmit,
        resetField,
    } = useForm<IInputs>() //IInput-интерфейс

    const onSubmit = async (data: IInputs) => {
        try{
            const userData = await signUpFx({
                url: '/users/signup',
                username: data.name,
                email: data.email,
                password: data.password,
            })

            console.log(userData)

            resetField('name')
            resetField('email')
            resetField('password')
            switchForm()
        }catch(e){
            toast.error((e as Error).message)
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
                SIGN UP
            </button>
        </form>
    )
}

export default SignUpForm