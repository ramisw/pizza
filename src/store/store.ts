import {configureStore} from '@reduxjs/toolkit'
import authSlice from "@/store/slices/auth.slice";
import filterSlice from "@/store/slices/filter.slice";
import pizzaSlice from "@/store/slices/pizza.slice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authSlice,
            filter: filterSlice,
            pizza: pizzaSlice,
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']