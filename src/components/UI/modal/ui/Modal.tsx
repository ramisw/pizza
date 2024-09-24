'use client'
import {useRouter} from 'next/navigation';
import {createPortal} from 'react-dom';
import styles from './modal.module.scss'
import {ReactNode} from "react";
import Image from "next/image";

export const Modal = ({children}: { children: ReactNode }) => {
    const router = useRouter()

    function close() {
        router.back()
    }

    return createPortal(
        <div className={styles.overlay} onClick={close}>
            <div className={styles.content} onClick={e => e.stopPropagation()}>
                {children}
                <Image className={styles.close} onClick={close} width={25} height={25} src={'/icons/close.svg'} alt={''}/>
            </div>
        </div>,
        document.getElementById('modal') as HTMLElement
    )
}