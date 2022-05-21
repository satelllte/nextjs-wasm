import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { WASMExample } from '../components/WASMExample'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.JS with WebAssembly</title>
        <meta name="description" content="Next.JS with WebAssembly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js</a> with WebAssembly!
        </h1>

        <div className={styles.wasm}>
          <WASMExample/>
        </div>
      </main>
    </div>
  )
}

export default Home
