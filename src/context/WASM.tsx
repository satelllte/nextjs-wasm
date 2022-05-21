import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'react'

const initial: IWASMContext = {}

export const WASMContext = createContext(initial)

export const WASMContextProvider: React.FC<WASMContextProviderProps> = ({
  children
}) => {
  const [state, setState] = useState<IWASMContext>(initial)

  useEffect(() => {
    (async() => {
      const wasm = await import('wasm')
      await wasm.default()
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
