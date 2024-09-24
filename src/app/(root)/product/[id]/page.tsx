import {getProductById} from "@/services/product.service";
import Product from "@/components/product";

type Props = {
    params: {
        id: string
    }
}

export default async function ProductPage({params}: Props) {

    const pizza = await getProductById(params.id)

    if (pizza) {
        return (
            <Product pizza={pizza}/>
        )
    }
}