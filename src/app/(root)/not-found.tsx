import Image from "next/image";
import Link from "next/link";
import Button from "@/components/UI/button";
import styles from '@/app/not-found.module.scss'

export default function NotFound() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrap}>
                <h1>Страница не найдена</h1>
                <span>Проверьте корректность введённого адреса <br/> или повторите попытку позже</span>
                <div className={styles.btns}>
                    <Link href={'/'}>
                        <Button typed={'outline'}>
                            <Image src={'/icons/arrowLeftIcon.svg'} alt={''}/>
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
            <Image src={'/icons/notfound.svg'} alt={''}/>
        </div>
    )
}