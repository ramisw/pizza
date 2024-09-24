import {collection, doc, getDoc, getDocs} from "@firebase/firestore";
import {db} from "@/lib/firebase";
import {IPizza} from "@/types/pizza";

export async function getProducts(): Promise<IPizza[] | null> {
    try {
        const pizzas: IPizza[] = []
        const response = await getDocs(collection(db, 'pizzas'))
        response.forEach((doc) => {
            pizzas.push({...doc.data() as IPizza, id: doc.id})
        })
        return pizzas
    } catch (e) {
        console.error('Error fetching product: ', e)
        return null
    }
}

export async function getProductById(id: string): Promise<IPizza | null> {
    try {
        const response = await getDoc(doc(db, 'pizzas', id))

        if (response.exists()) {
            const pizzaData = response.data() as IPizza
            return {id: response.id, ...pizzaData}
        } else {
            return null
        }
    } catch (error) {
        console.error('Error fetching product: ', error)
        return null
    }
}