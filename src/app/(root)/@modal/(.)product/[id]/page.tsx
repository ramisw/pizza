import {getProductById} from "@/services/product.service";
import Product from "@/components/product";
import Modal from "@/components/UI/modal";

type Props = {
    params: {
        id: string
    }
}

export default async function ProductPage({params}: Props) {

    const pizza = await getProductById(params.id)

    if (pizza) {
        return (
            <Modal>
                <Product pizza={pizza}/>
            </Modal>
        )
    }
}