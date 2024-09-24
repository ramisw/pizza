'use client'
import {ReactNode, useRef} from 'react'
import {Provider} from 'react-redux'
import {makeStore, AppStore} from '@/store/store'
import {productActions} from "@/store/slices/product.slice";
import {IPizza} from "@/types/pizza";

export default function RootProvider({children, products}: { children: ReactNode, products: IPizza[] }) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        storeRef.current = makeStore()
        storeRef.current.dispatch(productActions.setProducts(products))
    }
    return <Provider store={storeRef.current}>{children}</Provider>
}