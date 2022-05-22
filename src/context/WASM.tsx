import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'react'
import type { WASM } from '../types'

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
  wasm?: WASM
}

interface WASMContextProviderProps {
  children: ReactNode
}
