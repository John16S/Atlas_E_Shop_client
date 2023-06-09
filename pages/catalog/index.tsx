import Layout from '@/components/layout/Layout'
import CatalogPage from '@/components/templates/CatalogPage/CatalogPage'
import userRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { IQueryParams } from '@/types/catalog'
import Head from 'next/head'

function Catalog( {query} : { query: IQueryParams } ) {
    const { shoudLoadContent } = userRedirectByUserCheck()

    return (
        <>
            <Head>
                <title>
                    Atlas | {shoudLoadContent ? 'Каталог товаров' : ''}
                </title>
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
                        <CatalogPage query={query}/>
                        <div className="overlay"></div>
                    </main>
                </Layout>
            )}
        </>
    )
}

//*Функция для работы с пагинацией
export async function getServerSideProps(context: {query: IQueryParams }) {
    return{
        props: { query: { ...context.query } }
    }
}

export default Catalog
