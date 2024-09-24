'use client'
import {useAppSelector} from "@/hooks/redux";
import Card from "@/components/UI/card";

export const Pizzas = () => {
    const {filteredProducts, filterStatus, products} = useAppSelector(state => state.product)
    const pizzas = filterStatus ? filteredProducts : products

    return (
        <div className='rowProducts'>
            {pizzas.map(pizza => (
                <Card pizza={pizza} key={pizza.id}/>
            ))}
        </div>
    )
}