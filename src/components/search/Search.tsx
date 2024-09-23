'use client'

import Image from "next/image";
import {icons} from "@/icons";
import styles from './search.module.scss';
import {ChangeEvent, useState, useEffect} from "react";
import {useAppSelector} from "@/hooks/redux";
import {IPizza} from "@/types/pizza";
import Link from "next/link";

export default function Search() {
    const [value, setValue] = useState('')
    const {pizzas} = useAppSelector(state => state.pizza)
    const [filteredPizzas, setFilteredPizzas] = useState<IPizza[]>([])
    const [isFocused, setIsFocused] = useState(false)

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const searchTerm = e.target.value
        setValue(searchTerm)

        setFilteredPizzas(pizzas.filter(pizza =>
            pizza.title.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    }

    function handleBlur() {
        setTimeout(() => setIsFocused(false), 200)
    }

    return (
        <div className={styles.overlay}>
            {isFocused &&
                <div
                    className={styles.focus}
                    onClick={() => setIsFocused(!isFocused)}
                ></div>
            }
            <div className={styles.input}>
                <input
                    onChange={handleInputChange}
                    value={value}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Поиск пиццы..."
                />
                <Image src={icons.search} alt=''/>
            </div>
            {isFocused && value && filteredPizzas.length > 0 &&
                <div className={styles.content}>
                    {filteredPizzas.map(pizza => (
                        <Link href={`/product/${pizza.id}`} className={styles.item} key={pizza.id}>
                            <span>{pizza.title}</span>
                        </Link>
                    ))}
                </div>
            }
        </div>
    )
}
