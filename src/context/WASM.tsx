import { ReactNode, useEffect, useRef, useState } from 'react'
import { createContext } from 'react'

const initial: IWASMContext = {}

export const WASMContext = createContext(initial)

export const WASMContextProvider: React.FC<WASMContextProviderProps> = ({
  children
}) => {
  const [state, setState] = useState<IWASMContext>(initial)

  // Important: this has to runs only once 
  // (with `reactStrictMode: true` and dev mode the regular effect with empty dependencies runs twice),
  // otherwise the app can crash, see https://github.com/rustwasm/wasm-bindgen/issues/3153
  useEffectOnce(() => {
    (async() => {
      const wasm = await import("wasm");
      await wasm.default();
      setState({ wasm });
    })()
  })

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

const useEffectOnce = (f: () => void) => {
  const ref = useRef(true);
  useEffect(() => {
    if (ref.current) {
      f();
    }
    return () => {
      ref.current = false;
    };
  }, [f]);
}
