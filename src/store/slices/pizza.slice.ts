import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPizza} from "@/types/pizza";
import {doc, getDoc, getDocs} from "@firebase/firestore";
import {collection} from "@firebase/firestore";
import {db} from "@/lib/firebase";
import {addDoc} from "@firebase/firestore";

interface PizzaState {
    pizzas: IPizza[]
    currentPizza: IPizza | null
    loading: boolean
    error: string | undefined
}

export const getPizzaById = createAsyncThunk<IPizza | null, string, { rejectValue: string }>(
    'pizza/getPizzaById',
    async (id, { rejectWithValue }) => {
        try {
            const pizzaRef = doc(db, 'pizzas', id)
            const response = await getDoc(pizzaRef)
            if (response.exists()) {
                return { id: response.id, ...response.data() } as IPizza
            } else {
                return null
            }
        } catch (e) {
            console.error('Ошибка при получении пиццы:', e)
            return rejectWithValue('Нет такой пиццы!')
        }
    }
)

export const getPizzas = createAsyncThunk<IPizza[], void, { rejectValue: string }>(
    'pizza/getPizzas',
    async (_, {rejectWithValue}) => {
        try {
            const pizzas: IPizza[] = []
            const response = await getDocs(collection(db, 'pizzas'))

            response.forEach((doc) => {
                pizzas.push({...doc.data() as IPizza, id: doc.id})
            })
            console.log('response', response)
            return pizzas
        } catch (error) {
            console.log('error', error)
            return rejectWithValue('Ошибка при загрузке пицц')
        }
    }
)

export const addPizza = createAsyncThunk<IPizza, IPizza, { rejectValue: string }>(
    'pizza/addPizza',
    async (pizza, {rejectWithValue}) => {
        try {
            const response = await addDoc(collection(db, 'pizzas'), pizza)
            return {id: response.id, ...pizza}
        } catch (error) {
            return rejectWithValue('Ошибка при добавлении пиццы')
        }
    }
)

const initialState: PizzaState = {
    currentPizza: null,
    pizzas: [],
    error: undefined,
    loading: false
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        resetCurrentPizza: (state) => {
            state.currentPizza = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPizzas.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(getPizzas.fulfilled, (state, action) => {
                state.pizzas = action.payload
                state.loading = false
            })
            .addCase(getPizzas.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(addPizza.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(addPizza.fulfilled, (state, action) => {
                state.pizzas.push(action.payload)
                state.loading = false
            })
            .addCase(addPizza.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(getPizzaById.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(getPizzaById.fulfilled, (state, action) => {
                state.currentPizza = action.payload
                state.loading = false
            })
            .addCase(getPizzaById.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
    }
})

export const pizzaActions = pizzaSlice.actions
export default pizzaSlice.reducer