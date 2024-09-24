'use client'
import Image from "next/image";
import styles from './search.module.scss';
import {ChangeEvent, useState, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {IPizza} from "@/types/pizza";
import Link from "next/link";
import {getProducts} from "@/services/product.service";
import {productActions} from "@/store/slices/product.slice";

export const Search = () => {

    const [value, setValue] = useState('')
    const {products} = useAppSelector(state => state.product)
    const [filteredPizzas, setFilteredPizzas] = useState<IPizza[]>([])
    const [isFocused, setIsFocused] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        getProducts().then(pizza => {
            if (pizza){
                dispatch(productActions.setProducts(pizza))
            }
        })
    })

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const searchTerm = e.target.value
        setValue(searchTerm)

        setFilteredPizzas(products.filter(pizza =>
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
                <Image width={16} height={16} src={'/icons/search.svg'} alt=''/>
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
