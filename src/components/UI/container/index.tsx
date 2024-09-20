'use client'
import styles from './container.module.scss'
import {ReactNode} from "react";

export default function Container({children}: {children: ReactNode}) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}