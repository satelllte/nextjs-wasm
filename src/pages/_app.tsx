import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WASMContextProvider } from '../context/WASM'
import { WASMWorkerContextProvider } from '../context/WASMWorker'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WASMContextProvider>
      <WASMWorkerContextProvider>
        <Component {...pageProps} />
      </WASMWorkerContextProvider>
    </WASMContextProvider>
  )
}

export default App
