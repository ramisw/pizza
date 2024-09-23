'use client'
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {getPizzaById, pizzaActions} from "@/store/slices/pizza.slice";
import styles from "@/components/product/product.module.scss";
import Image from "next/image";
import SwitcherOption from "@/components/UI/switcherOption/SwitcherOption";
import Button from "@/components/UI/button";
import NotFound from "@/app/(root)/not-found";

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

export default function Product({id}: { id: string }) {

    const [size, setSize] = useState('small');
    const [crust, setCrust] = useState('traditional');
    const [extras, setExtras] = useState<string[]>([]);

    const {currentPizza, loading} = useAppSelector(state => state.pizza);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPizzaById(id))
        return () => {
            dispatch(pizzaActions.resetCurrentPizza())
        }
    }, [dispatch, id]);

    const toggleExtra = (extra: string) => {
        setExtras((prevExtras) =>
            prevExtras.includes(extra) ? prevExtras.filter((e) => e !== extra) : [...prevExtras, extra]
        );
    };


    const calculateTotalPrice = () => {
        const extrasTotal = extras.reduce((acc, extra) => {
            const option = additionalOptions.find(opt => opt.label === extra);
            return option ? acc + option.price : acc;
        }, 0);
        return currentPizza ? currentPizza.price + extrasTotal : 0;
    }
    if (loading) {
        return <div>Загрузка...</div>
    } else {
        if (!currentPizza) return <NotFound/>
        else{
            return (
                <div className={styles.wrapper}>
                    <Image
                        className={styles.image}
                        width={300}
                        height={300}
                        src={currentPizza.imgUrl}
                        alt={currentPizza.title}
                    />
                    <div className={styles.description}>
                        <h3>{currentPizza.title}</h3>
                        <span
                            className={styles.subtitle}>{`${sizeOptions.find(option => option.value === size)?.label}, ${crustOptions.find(option => option.value === crust)?.label}`}</span>
                        <SwitcherOption
                            options={sizeOptions}
                            selectedValue={size}
                            onChange={setSize}
                        />
                        <SwitcherOption
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
}
