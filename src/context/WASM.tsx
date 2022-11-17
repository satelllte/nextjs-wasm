import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'react'

// initialize at module scope, to prevent executing twice on strict mode,
// which can cause issues when calling async functions on wasm
const wasmPromise = import('wasm').then(wasm => {
  if (typeof window !== "undefined") { 
      // client side: initialize
      return wasm.default().then(() => wasm)
  } else { 
      // server side: do nothing
      return wasm
  }
}) 

const initial: IWASMContext = {}

export const WASMContext = createContext(initial)

export const WASMContextProvider: React.FC<WASMContextProviderProps> = ({
  children
}) => {
  const [state, setState] = useState<IWASMContext>(initial)

  useEffect(() => {
    (async() => {
      const wasm = await wasmPromise
      setState({ wasm })
    })()
  }, [])

  return (
    <WASMContext.Provider value={state}>
      {children}
    </WASMContext.Provider>
  )
}

interface IWASMContext {
  wasm?: typeof import('wasm')
}

interface WASMContextProviderProps {
  children: ReactNode
}
