import notFoundIcon from '@/icons/notfound.svg'
import Image from "next/image";
import arrowLeftIcon from '@/icons/arrowLeft.svg'
import Link from "next/link";
import Button from "@/components/UI/button";
import styles from '../not-found.module.scss'

export default function NotFound() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrap}>
                <h1>Страница не найдена</h1>
                <span>Проверьте корректность введённого адреса <br/> или повторите попытку позже</span>
                <div className={styles.btns}>
                    <Link href={'/'}>
                        <Button typed={'outline'}>
                            <Image src={arrowLeftIcon} alt={''}/>
                            На главную
                        </Button>
                    </Link>
                    <Link href={'/'}>
                        <Button typed={'outline'}>
                            Обновить
                        </Button>
                    </Link>
                </div>
            </div>
            <Image src={notFoundIcon} alt={''}/>
        </div>
    )
}