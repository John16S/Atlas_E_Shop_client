import Head from 'next/head'
import { useCallback } from 'react'
import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import OrderPage from '@/components/templates/OrderPage/OrderPage'

function Order() {
  const { shoudLoadContent } = useRedirectByUserCheck()
  const getDefaultTextGenerator = useCallback(() => 'Оформление заказа', [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])

  return (
    <>
      <Head>
        <title>
          Атлас | {shoudLoadContent ? 'Оформление заказа' : ''}
        </title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {shoudLoadContent && (
        <Layout>
          <main>
            {/* <Breadcrumbs
              getDefaultTextGenerator={getDefaultTextGenerator}
              getTextGenerator={getTextGenerator}
            /> */}
            <OrderPage/>
            <div className="overlay" />
          </main>
        </Layout>
      )}
    </>
  )
}

export default Order
