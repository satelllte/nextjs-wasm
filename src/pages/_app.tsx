import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WASMContextProvider } from '../context/WASM'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <WASMContextProvider>
      <Component {...pageProps} />
    </WASMContextProvider>
  )
}

export default App
