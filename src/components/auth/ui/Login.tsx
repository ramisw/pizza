'use client'
import styles from "./auth.module.scss";
import Button from "@/components/UI/button";
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {useRouter} from "next/navigation";
import {ChangeEvent, FormEvent, useState} from "react";
import {login} from "@/store/slices/auth.slice";
import {useValidator} from "@/hooks/validate";

export const Login = () => {

    const {error} = useAppSelector((state) => state.auth)
    const {createValidator, errors} = useValidator()
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    const [formData, setFormData] = useState({email: '', password: ''})

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    const toggleVisibility = () => setIsVisible((prev) => !prev)

    const validateEmail = createValidator(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "email",
        {invalid: "Некорректный email"}
    )

    const validatePassword = createValidator(
        /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*.]{6,}$/,
        "password",
        {invalid: "Некорректный пароль"}
    )

    const validateForm = () => {
        const emailValid = validateEmail(formData.email)
        const passwordValid = validatePassword(formData.password)
        return emailValid && passwordValid
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsLoading(true)

        try {
            await dispatch(
                login({email: formData.email, password: formData.password})
            ).unwrap()
            router.back()
        } catch (e) {
            console.error('Ошибка при логина:', e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className={styles.wrapper} onSubmit={handleSubmit}>
            <h1>Вход в аккаунт</h1>
            {error && <h3 className={styles.error}>{error}</h3>}
            <div className={styles.inputWrapper}>
                <span className={styles.error}>{errors.email}</span>
                <input
                    name={"email"}
                    className={errors.email ? styles.inputError : ""}
                    type="text"
                    placeholder={"Введите e-mail"}
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => validateEmail(formData.email)}
                />
            </div>

            <div className={styles.inputWrapper}>
                <span className={styles.error}>{errors.password}</span>
                <input
                    name={'password'}
                    className={errors.password ? styles.inputError : ""}
                    type={isVisible ? "text" : "password"}
                    placeholder={"Введите пароль"}
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => validatePassword(formData.password)}
                />
            </div>

            <label>
                <input type="checkbox" checked={isVisible} onChange={toggleVisibility}/>
                <span>Показать пароль</span>
            </label>

            <Button typed={'primary'} disabled={isLoading} type="submit">
                {isLoading ? 'Загрузка...' : 'Войти'}
            </Button>

            <div className={styles.block}>
                <span>Есть аккаунт?</span>
                <Link replace href={"/signup"}>Создайте</Link>
            </div>
        </form>
    )
}