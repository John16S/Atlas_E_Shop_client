import Header from '@/components/modules/Header/Header'
import Head from 'next/head'

function Home() {
    return (
        <>
            <Head>
                <title>Atlas</title>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/img/logo.png"
                />
            </Head>
            <Header/>
            <h1>Home Page</h1>
        </>
    )
}

export default Home
