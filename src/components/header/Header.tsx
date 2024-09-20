import styles from './header.module.scss'
import Image from "next/image";
import {icons} from "../../icons";
import Link from "next/link";
import Search from "@/components/search";
import Button from "@/components/UI/button";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.link}>
                <div className={styles.logo}>
                    <Image src={icons.logo} alt={''}/>
                    <div>
                        <span>NEXT PIZZA</span>
                        <p>вкусней уже некуда</p>
                    </div>
                </div>
            </Link>
            <Search/>
            <Link href="/login">
                <Button typed={'outline'}>
                    <Image src={icons.user} alt={''}/>
                    Войти
                </Button>
            </Link>
        </header>
    )
}