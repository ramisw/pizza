import Filter from "@/components/filter";
import Pizzas from "@/components/pizzas";

export default async function HomePage() {

    return (
        <div className='layoutWrapper'>
            <div className={'sidebar'}>
                <Filter/>
            </div>
            <Pizzas/>
        </div>
    )
}