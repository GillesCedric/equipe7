import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Head from 'next/head'

const Main = dynamic(() => import('../src/components/Main'), { ssr: false })
const Home: NextPage = () => {

  return <>
    <Head>
      <title>DESIGN 4 Green</title>
      <meta name="description" content="Design 4 Green Application" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest"></link>
    </Head>
    <Suspense fallback={`Loading...`}>
      <Main />
    </Suspense>
  </>
}

export default Home
