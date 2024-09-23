'use client'
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {getPizzas} from "@/store/slices/pizza.slice";
import Card from "@/components/UI/card/Card";
import styles from './pizzas.module.scss'


export default function Pizzas() {
    
    const dispatch = useAppDispatch()
    const {pizzas} = useAppSelector(state => state.pizza)

    useEffect(() => {
        dispatch(getPizzas())
    }, [dispatch])

    return (
        <div className={styles.wrapper}>
            {pizzas.map((pizza) => {
                return (
                    <Card pizza={pizza} key={pizza.id}/>
                )
            })}
        </div>
    )
}