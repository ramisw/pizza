import Product from "@/components/product/Product";
import {Modal} from "@/components/UI/modal";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<{ params: string }> {
    return {
        params: params.id
    }
}

export default function ProductPage({params}: { params: { id: string } }) {

    return (
        <Modal>
            <Product id={params.id}/>
        </Modal>
    )
}