import '@/app/global.scss'
import {ReactNode} from "react"
import {Nunito} from "next/font/google";
import Header from "@/components/header";
import RootProvider from "@/app/RootProvider";
import {Metadata} from "next";
import Container from "@/components/UI/container";

const nunito = Nunito({
    subsets: ['cyrillic'],
    weight: ['400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
    title: 'Next',
    icons: './logo.svg'
}

export default function RootLayout(props: { children: ReactNode, modal: ReactNode }) {
    return (
        <RootProvider>
            <html>
            <body className={nunito.className}>
            <Container>
                <Header/>
                <div className={'content'}>
                    {props.children}
                </div>
            </Container>
            {props.modal}
            <div id="modal"/>
            </body>
            </html>
        </RootProvider>
    )
}