import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPizza} from "@/types/pizza";

interface ProductState {
    products: IPizza[]
    filteredProducts: IPizza[]
    loading: boolean
    error: string
    filterStatus: boolean
}

const initialState: ProductState = {
    products: [],
    filteredProducts: [],
    loading: false,
    error: '',
    filterStatus: false
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<IPizza[]>) {
            state.products = action.payload
        },
        setFilteredProducts(state, action) {
            state.filteredProducts = action.payload
            state.filterStatus = true
        }
    }
})

export const productActions = productSlice.actions
export default productSlice.reducer