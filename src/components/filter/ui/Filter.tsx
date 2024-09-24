'use client'
import styles from './filter.module.scss'
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {useState} from "react";
import {Ingredient, IPizza} from "@/types/pizza";
import {productActions} from "@/store/slices/product.slice";
import Button from "@/components/UI/button";
import {IFilterCriteria} from "@/types/filter";

const mokIngredients: Ingredient[] = [
    {title: 'Сырный соус', price: 79},
    {title: 'Моцарелла', price: 89},
    {title: 'Чеснок', price: 99},
    {title: 'Солёные огурчики', price: 78},
    {title: 'Красный лук', price: 78},
    {title: 'Томаты', price: 78}
]

export const Filter = () => {

    const [filter, setFilter] = useState<IFilterCriteria>({
        isNew: false,
        priceRange: [0, 1200],
        ingredients: [],
        typeDough: 'traditional'
    })

    const {products} = useAppSelector(state => state.product)
    const dispatch = useAppDispatch()

    function saveFilter() {
        const filterArr: IPizza[] = []
        products.filter(product => {
            if (product.isNew === filter.isNew
                && product.price > filter.priceRange[0]
                && product.price <= filter.priceRange[1]
                && product.typeDough === filter.typeDough) {
                filterArr.push(product)
            }
        })
        dispatch(productActions.setFilteredProducts(filterArr))

    }

    const handleIngredientChange = (ingredient: Ingredient) => {
        if (filter.ingredients.includes(ingredient)) {
            setFilter({
                ...filter,
                ingredients: filter.ingredients.filter(i => i !== ingredient)
            });
        } else {
            setFilter({
                ...filter,
                ingredients: [...filter.ingredients, ingredient]
            });
        }
    }

    return (
        <div className={styles.wrapper}>
            <span className={styles.title}>Фильтрация</span>

            <label className={styles.checkbox}>
                <input
                    type="checkbox"
                    checked={filter.isNew}
                    onChange={() => setFilter({...filter, isNew: !filter.isNew})}
                />
                <span>Новинки</span>
            </label>

            <div>
                <p className={styles.subtitle}>Цена от и до:</p>
                <div className={styles.price}>
                    <div>
                        <input
                            onChange={(e) => setFilter({
                                ...filter,
                                priceRange: [Number(e.target.value), filter.priceRange[1]]
                            })}
                            value={filter.priceRange[0]}
                            type="number"
                            placeholder={'0'}
                            min={0}
                            max={1920}
                        />
                        <span>₽</span>
                    </div>
                    <div>
                        <input
                            onChange={(e) => setFilter({
                                ...filter,
                                priceRange: [filter.priceRange[0], Number(e.target.value)]
                            })}
                            value={filter.priceRange[1]}
                            type="number"
                            placeholder={'1950'}
                            max={1920}
                            min={0}
                        />
                        <span>₽</span>
                    </div>
                </div>
            </div>

            <div>
                <span className={styles.subtitle}>Ингредиенты:</span>
                {mokIngredients.map(
                    (ingredient) => (
                        <label key={ingredient.title} className={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={filter.ingredients.includes(ingredient)}
                                onChange={() => handleIngredientChange(ingredient)}
                            />
                            <span>{ingredient.title}</span>
                        </label>
                    )
                )}
            </div>

            <div>
                <span className={styles.subtitle}>Тип теста:</span>
                <label className={styles.checkbox}>
                    <input
                        checked={filter.typeDough === 'traditional'}
                        onChange={() => setFilter({...filter, typeDough: 'traditional'})}
                        name={'dough'}
                        type="radio"
                    />
                    <span>Традиционное</span>
                </label>
                <label className={styles.checkbox}>
                    <input
                        checked={filter.typeDough === 'thin'}
                        onChange={() => setFilter({...filter, typeDough: 'thin'})}
                        name={'dough'}
                        type="radio"
                    />
                    <span>Тонкое</span>
                </label>
            </div>
            <Button onClick={saveFilter} typed={'primary'}>Применить</Button>
        </div>
    )
}
