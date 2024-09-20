import {ButtonHTMLAttributes, FC} from "react"
import styles from './button.module.scss'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    typed: 'primary' | 'outline'
}

const Button: FC<Props> = (props) => {
    return (
        <button className={props.typed === 'primary' ? styles.primary : styles.outline} {...props}>
            {props.children}
        </button>
    )
}

export default Button