import styles from './switcher.module.scss'
import {FC} from "react"

interface SwitcherOption {
    label: string
    value: string
}

interface SwitcherProps {
    options: SwitcherOption[]
    selectedValue: string
    onChange: (value: string) => void
}

const Switcher: FC<SwitcherProps> = ({ options, selectedValue, onChange }) => {
    return (
        <div className={styles.switcher}>
            {options.map(option => (
                <button
                    key={option.value}
                    className={`${styles.option} ${selectedValue === option.value ? styles.selected : ''}`}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}

export default Switcher
