import Layout from '@/components/layout/Layout'
import HomePage from '@/components/templates/HomePage/HomePage'
import userRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Head from 'next/head'

function Home() {
    const { shoudLoadContent } = userRedirectByUserCheck()

    return (
        <>
            <Head>
                <title>Atlas | {shoudLoadContent ? 'Главная страница' : ''}</title>
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

            {shoudLoadContent && (
                <Layout>
                    <main>
                        <HomePage/>
                        <div className="overlay" />
                    </main>
                </Layout>
            )}
        </>
    )
}

export default Home
