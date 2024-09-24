import '@/app/global.scss'
import {ReactNode} from "react"
import {Nunito} from "next/font/google";
import Header from "@/components/header";
import RootProvider from "@/app/RootProvider";
import Container from "@/components/UI/container";
import {getProducts} from "@/services/product.service";

const nunito = Nunito({
    subsets: ['cyrillic'],
    weight: ['400', '500', '600', '700', '800', '900']
})

export default async function RootLayout(props: { children: ReactNode, modal: ReactNode }) {

    const products = await getProducts()

    if (products) {
        return (
            <RootProvider products={products}>
                <html>
                <head>
                    <link rel="icon" href="/logo.svg"/>
                </head>
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
}