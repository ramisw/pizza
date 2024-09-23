interface Ingredient {
    title: string
    price: number
}

export interface IPizza {
    id?: string
    title: string
    description?: string
    price: number
    category: string
    ingredients: Ingredient[]
    imgUrl: string
    isNew: boolean
    typeDough?: 'traditional' | 'thin'
    size?: 'small' | 'medium' | 'large'
}