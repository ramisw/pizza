'use client'
import styles from "./authForm.module.scss";
import Button from "@/components/UI/button";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {ChangeEvent, FormEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {login, signup} from "@/store/slices/auth.slice";

export default function AuthForm({type}: { type: 'login' | 'signup' }) {
    const {error} = useAppSelector(state => state.auth)
    const isLogin = type === 'login'
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<{ email: string, password: string }>({email: '', password: ''})
    const dispatch = useAppDispatch()

    const toggleVisibility = () => setIsVisible(prev => !prev)

    const handleChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value)
    }

    const createValidator = (regex: RegExp, fieldName: string, messages: { required: string, invalid: string }) => {
        return (value: string) => {
            let error = ''

            if (!value) {
                error = messages.required
            } else if (!regex.test(value)) {
                error = messages.invalid
            }

            setErrors(prevErrors => ({...prevErrors, [fieldName]: error}))
            return !error
        }
    }

    const validateEmail = createValidator(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'email',
        {required: 'email обязателен', invalid: 'некорректный email'}
    )

    const validatePassword = createValidator(
        /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*.]{6,}$/,
        'password',
        {required: 'пароль обязателен', invalid: 'пароль некорректный'}
    )

    const validateForm = () => validateEmail(email) && validatePassword(password)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsLoading(true)

        try {
            if (isLogin) {
                await dispatch(login({email, password})).unwrap()
            } else {
                await dispatch(signup({email, password})).unwrap()
            }
            router.back()
        } catch (e) {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className={styles.wrapper} onSubmit={handleSubmit}>
            <h1>{isLogin ? 'Вход в аккаунт' : 'Регистрация'}</h1>

            {error && <h3 className={styles.error}>{error}</h3>}

            <div className={styles.inputWrapper}>
                <span className={styles.error}>{errors?.email}</span>
                <input
                    style={errors.email ? {borderColor: 'red'} : {}}
                    type="text"
                    placeholder={'Введите e-mail'}
                    value={email}
                    onChange={handleChange(setEmail)}
                    onBlur={() => validateEmail(email)}
                />
            </div>

            <div className={styles.inputWrapper}>
                <span className={styles.error}>{errors?.password}</span>
                <input
                    style={errors.password ? {borderColor: 'red'} : {}}
                    type={isVisible ? 'text' : 'password'}
                    placeholder={'Введите пароль'}
                    value={password}
                    onChange={handleChange(setPassword)}
                    onBlur={() => validatePassword(password)}
                />
            </div>

            <label>
                <input type="checkbox" checked={isVisible} onChange={toggleVisibility}/>
                <span>Показать пароль</span>
            </label>

            <Button typed={'primary'} disabled={isLoading} type="submit">
                {isLoading ? 'Загрузка...' : isLogin ? 'Войти' : 'Регистрация'}
            </Button>

            <span>{isLogin ? 'Нет аккаунта?' : 'Есть аккаунт?'}
                <Link replace href={`/${isLogin ? 'signup' : 'login'}`}>
                    {isLogin ? 'Создайте' : 'Войдите'}!
                </Link>
            </span>
        </form>
    )
}