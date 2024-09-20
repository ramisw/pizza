import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User} from "@firebase/auth";
import {auth} from "@/lib/firebase";
import {FirebaseError} from "@firebase/app";

export interface IEmailAndPassword {
    email: string
    password: string
}

interface IUser {
    displayName: string | null
    email: string | null
    uid: string
    photoUrl: string | null
    phoneNumber: string | null
}

interface AuthState {
    user: IUser | null
    error: string | undefined
    loading: boolean
}

const initialState: AuthState = {
    user: null,
    error: undefined,
    loading: false
}

export const login = createAsyncThunk<IUser, IEmailAndPassword, { rejectValue: string }>(
    'auth/login',
    async ({email, password}, {rejectWithValue}) => {
        try {
            const {user} = await signInWithEmailAndPassword(auth, email, password)
            return {
                displayName: user.displayName || null,
                email: user.email || null,
                uid: user.uid,
                photoUrl: user.photoURL || null,
                phoneNumber: user.phoneNumber || null
            }
        } catch (error) {
            console.log(error)
            if (error instanceof FirebaseError) {
                return rejectWithValue(handleError(error.code))
            } else {
                return rejectWithValue('Произошла неизвестная ошибка. Попробуйте снова.')
            }
        }
    }
)

export const signup = createAsyncThunk<IUser, IEmailAndPassword, { rejectValue: string }>(
    'auth/signup',
    async ({email, password}, {rejectWithValue}) => {
        try {
            const {user} = await createUserWithEmailAndPassword(auth, email, password)
            return {
                displayName: user.displayName || null,
                email: user.email || null,
                uid: user.uid,
                photoUrl: user.photoURL || null,
                phoneNumber: user.phoneNumber || null
            }
        } catch (error) {
            console.log(error)
            if (error instanceof FirebaseError) {
                return rejectWithValue(handleError(error.code))
            } else {
                return rejectWithValue('Произошла неизвестная ошибка. Попробуйте снова.')
            }
        }
    }
)

export const logout = createAsyncThunk<string | void, undefined, { rejectValue: string }>(
    'auth/logout',
    async (_, {rejectWithValue}) => {
        try {
            await signOut(auth)
        } catch (error) {
            if (error instanceof FirebaseError) {
                return rejectWithValue(handleError(error.code))
            }
        }
    })

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = {
                email: action.payload.email,
                uid: action.payload.uid,
                displayName: action.payload.displayName,
                phoneNumber: action.payload.phoneNumber,
                photoUrl: action.payload.photoURL
            }
        },
        logout(state) {
            state.user = null
            state.error = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false
                localStorage.setItem('user', JSON.stringify(action.payload))
                state.user = {
                    email: action.payload.email,
                    uid: action.payload.uid,
                    displayName: action.payload.displayName,
                    phoneNumber: action.payload.phoneNumber,
                    photoUrl: action.payload.photoUrl
                }
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.user = {
                    email: action.payload.email,
                    uid: action.payload.uid,
                    displayName: action.payload.displayName,
                    phoneNumber: action.payload.phoneNumber,
                    photoUrl: action.payload.photoUrl
                }
            })
            .addCase(login.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                }
            )
            .addCase(logout.fulfilled, (state) => {
                localStorage.removeItem('user')
                state.user = null
            })
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer

const handleError = (error: string) => {
    let message
    switch (error) {
        case 'auth/invalid-email':
            message = "Некорректный формат электронной почты"
            break
        case 'auth/user-disabled':
            message = "Эта учётная запись была отключена"
            break
        case 'auth/user-not-found':
            message = "Пользователь не найден"
            break
        case 'auth/wrong-password':
            message = "Неверный пароль"
            break
        case 'auth/network-request-failed':
            message = "Ошибка сети"
            break
        case 'auth/email-already-in-use':
            message = 'Пользователь с таким email уже есть'
            break
        default:
            message = "Произошла ошибка. Попробуйте снова"
            break
    }
    return message
}