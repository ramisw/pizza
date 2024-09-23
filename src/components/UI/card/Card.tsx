import Image from "next/image";
import {IPizza} from "@/types/pizza";
import Button from "@/components/UI/button";
import styles from './card.module.scss'
import Link from "next/link";

export default function Card({pizza}: { pizza: IPizza }) {
    return (
        <Link href={`/product/${pizza.id}`} className={styles.wrapper}>
            <Image width={280} height={280} src={pizza.imgUrl} alt={pizza.title}/>
            <div className={styles.data}>
                <h3 className={styles.title}>{pizza.title}</h3>
                <span className={styles.description}>{pizza.description}</span>
                <div>
                    <span>
                       от <strong>{pizza.price}</strong> ₽
                    </span>
                    <Button typed={'outline'}>
                        + Добавить
                    </Button>
                </div>
            </div>
        </Link>
    )
}