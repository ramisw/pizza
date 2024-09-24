'use client'
import {useState} from "react";
import styles from "@/components/product/ui/product.module.scss";
import Image from "next/image";
import Button from "@/components/UI/button";
import NotFound from "@/app/(root)/not-found";
import {IPizza} from "@/types/pizza";
import Switcher from "@/components/UI/switcher";

const sizeOptions = [
    {label: 'Маленькая', value: 'small'},
    {label: 'Средняя', value: 'medium'},
    {label: 'Большая', value: 'large'}
]

const crustOptions = [
    {label: 'Традиционное', value: 'traditional'},
    {label: 'Тонкое', value: 'thin'}
]

const additionalOptions = [
    {label: 'Сырный борт', price: 179},
    {label: 'Сливочная моцарелла', price: 79},
    {label: 'Сыр чеддер и пармезан', price: 79}
]

export const Product = ({pizza}: { pizza: IPizza }) => {

    const [size, setSize] = useState('small')
    const [crust, setCrust] = useState('traditional')
    const [extras, setExtras] = useState<string[]>([])

    const toggleExtra = (extra: string) => {
        setExtras((prevExtras) =>
            prevExtras.includes(extra) ? prevExtras.filter((e) => e !== extra) : [...prevExtras, extra]
        )
    }

    const calculateTotalPrice = () => {
        const extrasTotal = extras.reduce((acc, extra) => {
            const option = additionalOptions.find(opt => opt.label === extra)
            return option ? acc + option.price : acc
        }, 0);
        return pizza ? pizza.price + extrasTotal : 0
    }
    if (!pizza) {
        return <NotFound/>
    } else {
        return (
            <div className={styles.wrapper}>
                <Image
                    className={styles.image}
                    width={300}
                    height={300}
                    src={pizza.imgUrl}
                    alt={pizza.title}
                />
                <div className={styles.description}>
                    <h3>{pizza.title}</h3>
                    <span
                        className={styles.subtitle}>{`${sizeOptions.find(option => option.value === size)?.label}, ${crustOptions.find(option => option.value === crust)?.label}`}</span>
                    <Switcher
                        options={sizeOptions}
                        selectedValue={size}
                        onChange={setSize}
                    />
                    <Switcher
                        options={crustOptions}
                        selectedValue={crust}
                        onChange={setCrust}
                    />
                    <h4>Добавить по вкусу</h4>
                    <div className={styles.extras}>
                        {additionalOptions.map(option => (
                            <div
                                key={option.label}
                                className={`${styles.extraCard} ${extras.includes(option.label) ? styles.selected : ''}`}
                                onClick={() => toggleExtra(option.label)}
                            >
                                <span>{option.label}</span>
                                <span>{option.price} ₽</span>
                            </div>
                        ))}
                    </div>
                    <Button typed="primary">
                        Добавить в корзину за {calculateTotalPrice()} ₽
                    </Button>
                </div>
            </div>
        )
    }
}
