import {useState} from 'react'

interface Errors {
    [key: string]: string
}

export const useValidator = () => {
    const [errors, setErrors] = useState<Errors>({})

    const createValidator = (
        regex: RegExp,
        fieldName: string,
        messages: {
            invalid: string;
            confirm?: string;
        },
        confirmFieldName?: string
    ) => {
        return (value: string, confirmValue?: string) => {
            let error = ''

            if (!value) {
                error = 'поле обязательно'
            } else if (!regex.test(value)) {
                error = messages.invalid
            } else if (
                confirmFieldName &&
                confirmValue !== undefined &&
                confirmValue !== value
            ) {
                error = messages.confirm || 'значения не совпадают'
            }

            setErrors((prevErrors) => ({...prevErrors, [fieldName]: error}))
            return !error
        }
    }

    const resetErrors = () => setErrors({})

    return {
        createValidator,
        errors,
        resetErrors
    }
}
