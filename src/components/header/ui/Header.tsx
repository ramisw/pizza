'use client'
import styles from './header.module.scss'
import Image from "next/image";
import Link from "next/link";
import Search from "@/components/search";
import Button from "@/components/UI/button";
import {useAppSelector} from "@/hooks/redux";

export const Header = () => {

    const {user} = useAppSelector(state => state.auth)

    return (
        <header className={styles.header}>
            <Link href="/" className={styles.link}>
                <div className={styles.logo}>
                    <Image width={35} height={35} src={'/logo.svg'} alt={''}/>
                    <div>
                        <span>NEXT PIZZA</span>
                        <p>вкусней уже некуда</p>
                    </div>
                </div>
            </Link>
            <Search/>
            {!user ? <Link href="/login">
                <Button typed={'outline'}>
                    <Image width={13} height={15} src={'/icons/user.svg'} alt={''}/>
                    Войти
                </Button>
            </Link> : <Link href="/profile">
                <Button typed={'outline'}>
                    <Image width={13} height={15} src={'/icons/user.svg'} alt={''}/>
                    Профиль
                </Button>
            </Link>
            }
        </header>
    )
}