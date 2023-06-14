import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useCallback, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { IQueryParams } from '@/types/catalog'
import { $good, setGood } from '@/context/good'
import { getGoodFx } from '@/app/api/goods'
import GoodPage from '@/components/templates/GoodPage/GoodPage'
import Custom404 from '../404'

function CatalogGoodPage({ query }: { query: IQueryParams }) {
    const { shoudLoadContent } = useRedirectByUserCheck()
    const good = useStore($good)
    //*Состояние на случай если данные не придут из сервера
    const [error, setError] = useState(false)
    const router = useRouter()

    useEffect(() => {
        loadGood()
    }, [router.asPath])

    const loadGood = async () => {
        try {
            const data = await getGoodFx(`/goods/find/${query.goodId}`)
            if (!data) {
                setError(true)
                return
            }
            setGood(data)
        } catch (e) {
            toast.error((e as Error).message)
        }
    }

    
    const getDefaultTextGenerator = useCallback(
        (subpath: string) => subpath.replace('catalog', 'Каталог'),
        []
    )
    const getTextGenerator = useCallback((param: string) => ({}[param]), [])
    const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

    // useEffect(() => {
    //     if (lastCrumb) {
    //         lastCrumb.textContent = boilerPart.name
    //     }
    // }, [lastCrumb, boilerPart])

    return (
        <>
            <Head>
                <title>Атлас | {shoudLoadContent ? good.name : ''}</title>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link
                    rel="icon"
                    type="image/svg"
                    sizes="32x32"
                    href="/img/logo.svg"
                />
            </Head>

            {error ? (
              <Custom404/>
            ) : (
              shoudLoadContent && (
                  <Layout>
                      <main>
                          <GoodPage/>
                          <div className="overlay"></div>
                      </main>
                  </Layout>
                )
            )}
            
        </>
    )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
    return {
        props: { query: { ...context.query } },
    }
}

export default CatalogGoodPage
