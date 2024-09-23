'use client'
import styles from "./auth.module.scss";
import Button from "@/components/UI/button";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {useRouter} from "next/navigation";
import {ChangeEvent, FormEvent, useState} from "react";
import {signup} from "@/store/slices/auth.slice";

export const Signup = () => {

    const {error} = useAppSelector((state) => state.auth)
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const dispatch = useAppDispatch()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const toggleVisibility = () => setIsVisible((prev) => !prev)

    const createValidator = (regex: RegExp, fieldName: string, messages: {
        invalid: string;
        confirm?: string;
    }, confirmFieldName?: string) => {
        return (value: string, confirmValue?: string) => {
            let error: string | undefined = ''

            if (!value) {
                error = 'Поле обязательно'
            } else if (!regex.test(value)) {
                error = messages.invalid
            } else if (
                confirmFieldName &&
                confirmValue !== undefined &&
                confirmValue !== value
            ) {
                error = messages.confirm
            }

            setErrors((prevErrors) => ({...prevErrors, [fieldName]: error}))
            return !error
        }
    }

    const validateUsername = createValidator(
        /^[A-Za-zА-Яа-яЁё\s'-]{2,30}$/,
        'username',
        {invalid: 'Некорректное имя'}
    )

    const validateEmail = createValidator(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'email',
        {invalid: 'Некорректный email'}
    )

    const validatePassword = createValidator(
        /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*.]{6,}$/,
        'password',
        {invalid: 'Некорректный пароль'}
    )

    const validateConfirmPassword = createValidator(
        /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*.]{6,}$/,
        'confirmPassword',
        {
            invalid: 'Некорректный пароль',
            confirm: 'Пароли не совпадают'
        },
        'password'
    )

    const validateForm = () => {
        const usernameValid = validateUsername(formData.username)
        const emailValid = validateEmail(formData.email)
        const passwordValid = validatePassword(formData.password)
        const confirmPasswordValid = validateConfirmPassword(
            formData.confirmPassword,
            formData.password
        )

        return usernameValid && emailValid && passwordValid && confirmPasswordValid
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsLoading(true)

        try {
            await dispatch(
                signup({username: formData.username, email: formData.email, password: formData.password})
            ).unwrap()
            router.back()
        } catch (e) {
            console.error('Ошибка при регистрации:', e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className={styles.wrapper} onSubmit={handleSubmit}>
            <h1>Регистрация</h1>
            {error && <h3 className={styles.error}>{error}</h3>}

            <div className={styles.inputWrapper}>
                <span className={styles.error}>{errors.username}</span>
                <input
                    name={'username'}
                    className={errors.username ? styles.inputError : ''}
                    type="text"
                    placeholder={'Введите имя'}
                    value={formData.username}
                    onChange={handleChange}
                    onBlur={() => validateUsername(formData.username)}
                />
            </div>

            <div className={styles.inputWrapper}>
                <span className={styles.error}>{errors.email}</span>
                <input
                    name={'email'}
                    className={errors.email ? styles.inputError : ''}
                    type="text"
                    placeholder={'Введите e-mail'}
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => validateEmail(formData.email)}
                />
            </div>

            <div className={styles.inputWrapper}>
                <span className={styles.error}>{errors.password}</span>
                <input
                    name={'password'}
                    className={errors.password ? styles.inputError : ''}
                    type={isVisible ? 'text' : 'password'}
                    placeholder={'Введите пароль'}
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => validatePassword(formData.password)}
                />
            </div>

            <div className={styles.inputWrapper}>
                <span className={styles.error}>{errors.confirmPassword}</span>
                <input
                    name={'confirmPassword'}
                    className={errors.confirmPassword ? styles.inputError : ''}
                    type={isVisible ? 'text' : 'password'}
                    placeholder={'Повторите пароль'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={() => validateConfirmPassword(formData.confirmPassword, formData.password)}
                />
            </div>

            <label>
                <input type="checkbox" checked={isVisible} onChange={toggleVisibility}/>
                <span>Показать пароль</span>
            </label>

            <Button typed={"primary"} disabled={isLoading} type="submit">
                {isLoading ? 'Загрузка...' : 'Регистрация'}
            </Button>

            <div className={styles.block}>
                <span>Нет аккаунта?</span>
                <Link replace href={'/login'}>Войдите</Link>
            </div>
        </form>
    )
}