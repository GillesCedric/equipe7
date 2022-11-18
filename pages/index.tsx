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
      <link rel="icon" type="image/svg" href="/favicon-32x32.png" />
    </Head>
    <Suspense fallback={`Loading...`}>
      <Main />
    </Suspense>
  </>
}

export default Home
