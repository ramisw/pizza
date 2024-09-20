'use client'
import Image from "next/image";
import {icons} from "../../icons";
import styles from './search.module.scss'
import {useState} from "react";

interface Pizza {
    id: number
    name: string
    price: number
}

const pizzas: Pizza[] = [
    {id: 1, name: 'Чизбургер-пицца', price: 179},
    {id: 2, name: 'Острая пицца-чизбургер', price: 299},
]

export default function Search() {

    const [value, setValue] = useState('')
    const [filteredPizzas, setFilteredPizzas] = useState<Pizza[]>([])
    const [isFocused, setIsFocused] = useState(false)

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
        setFilteredPizzas(pizzas.filter(pizza => {
            return pizza.name.toLowerCase().includes(value.toLowerCase())
        }))
    }

    return (
        <div className={styles.overlay}>
            {isFocused &&
                <div
                    className={styles.focus}
                    onClick={() => setIsFocused(!isFocused)}
                ></div>}
            <div className={styles.input}>
                <input
                    onChange={handleInputChange}
                    value={value}
                    onFocus={() => setIsFocused(true)}
                    type="text"
                    placeholder="Поиск пиццы..."
                />
                <Image src={icons.search} alt={''}/>
            </div>
            {isFocused &&
                <div className={styles.content}>
                    {filteredPizzas.map(pizza => {
                        return (
                            <div className={styles.item} key={pizza.id}>
                                <span>{pizza.name}</span>
                            </div>
                        )
                    })}
                </div>}
        </div>
    )
}