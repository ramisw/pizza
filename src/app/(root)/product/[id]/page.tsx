import Product from "@/components/product/Product";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<{ params: string }> {
    return {
        params: params.id
    }
}

export default function ProductPage({params}: { params: { id: string } }) {

    return (
        <Product id={params.id}/>
    )
}