import {Ingredient} from "@/types/pizza";

export interface IFilterCriteria {
    isNew: boolean
    priceRange: [number, number]
    ingredients: Ingredient[]
    typeDough: string
}