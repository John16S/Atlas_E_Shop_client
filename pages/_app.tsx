import type { AppProps } from 'next/app'
import { withHydrate } from 'effector-next'
import { useEffect, useState } from 'react'
import NextNProggress from 'nextjs-progressbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

//*Обёртка для нашего приложения
const enhance = withHydrate()

function App({ Component, pageProps }: AppProps) {
  //*оптимизация для того чтобы у нас не сработал рендер до отрисовки контента в браузере
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    mounted && (
      <>
        <NextNProggress/>
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          limit={1}
          theme="light"
        />
      </>
    )
  )
}

export default enhance(App as React.FC<AppProps>)