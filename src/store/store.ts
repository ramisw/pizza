import {configureStore} from '@reduxjs/toolkit'
import authSlice from "@/store/slices/auth.slice";
import productSlice from "@/store/slices/product.slice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authSlice,
            product: productSlice
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']