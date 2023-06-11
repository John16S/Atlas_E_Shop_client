import Head from 'next/head'
import AuthPage from '@/components/templates/AuthPage/AuthPage'
import { useState } from 'react'
import userRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'

function Auth() {
  const { shoudLoadContent } = userRedirectByUserCheck(true)
  return (
    <>
      <Head>
      <title>Atlas | {shoudLoadContent ? 'Авторизация' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/logo.png" />
      </Head>
      {shoudLoadContent && <AuthPage />}
    </>
  )
}

export default Auth