'use client'
import styles from './filter.module.scss'
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {filterActions} from "@/store/slices/filter.slice";

export default function Filter() {

    const {typeDough, priceRange, isNew, canCustomize, ingredients} = useAppSelector(state => state.filter)
    const dispatch = useAppDispatch()

    return (
        <div className={styles.wrapper}>
            <span className={styles.title}>Фильтрация</span>
            <label className={styles.checkbox}>
                <input type="checkbox" checked={canCustomize}
                       onChange={() => dispatch(filterActions.toggleCanCustomize())}/>
                <span>Можно собирать</span>
            </label>
            <label className={styles.checkbox}>
                <input type="checkbox" checked={isNew} onChange={() => dispatch(filterActions.toggleIsNew())}/>
                <span>Новинки</span>
            </label>
            <div>
                <p className={styles.subtitle}>Цена от и до:</p>
                <div className={styles.price}>
                    <div>
                        <input
                            onChange={(e) => dispatch(filterActions.setPriceRange([Number(e.target.value), priceRange[1]]))}
                            value={priceRange[0]}
                            type="number"
                            placeholder={'0'}
                            min={0}
                            max={1920}
                        />
                        <span>₽</span>
                    </div>
                    <div>
                        <input
                            onChange={(e) => dispatch(filterActions.setPriceRange([priceRange[0], Number(e.target.value)]))}
                            value={priceRange[1]}
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
                {['Сырный соус', 'Моцарелла', 'Чеснок', 'Солёные огурчики', 'Красный лук', 'Томаты'].map(
                    (ingredient) => (
                        <label key={ingredient} className={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={ingredients.includes(ingredient)}
                                onChange={() => dispatch(filterActions.toggleIngredients(ingredient))}
                            />
                            <span>{ingredient}</span>
                        </label>
                    )
                )}
            </div>
            <div>
                <span className={styles.subtitle}>Тип теста:</span>
                <label className={styles.checkbox}>
                    <input
                        checked={typeDough === 'traditional'}
                        onChange={() => dispatch(filterActions.setDoughType('traditional'))}
                        name={'dough'}
                        type="radio"
                    />
                    <span>Традиционное</span>
                </label>
                <label className={styles.checkbox}>
                    <input
                        checked={typeDough === 'thin'}
                        onChange={() => dispatch(filterActions.setDoughType('thin'))}
                        name={'dough'}
                        type="radio"
                    />
                    <span>Тонкое</span>
                </label>
            </div>
        </div>
    )
}