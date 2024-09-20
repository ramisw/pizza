import {createSlice} from "@reduxjs/toolkit";

interface FilterState {
    isNew: boolean
    priceRange: [number, number]
    ingredients: string[]
    typeDough: 'traditional' | 'thin'
    canCustomize: boolean
}

const initialState: FilterState = {
    isNew: false,
    priceRange: [0, 1920],
    ingredients: [],
    typeDough: 'traditional',
    canCustomize: false
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        toggleCanCustomize: (state) => {
            state.canCustomize = !state.canCustomize
        },
        toggleIsNew: (state) => {
            state.isNew = !state.isNew
        },
        toggleIngredients: (state, action) => {
            const ingredient = action.payload
            if (state.ingredients.includes(ingredient)) {
                state.ingredients = state.ingredients.filter(i => i !== ingredient)
            } else {
                state.ingredients.push(ingredient)
            }
        },
        setDoughType(state, action) {
            state.typeDough = action.payload
        },
        setPriceRange(state, action) {
            state.priceRange = action.payload
        }
    }
})

export const filterActions = filterSlice.actions
export default filterSlice.reducer