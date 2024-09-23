import Pizzas from "@/components/pizzas/Pizzas";
import Filter from "@/components/filter";

export default async function Page() {
    return (
        <div className='layoutWrapper'>
            <div className={'sidebar'}>
                <Filter/>
            </div>
            <Pizzas/>
        </div>
    )
}
