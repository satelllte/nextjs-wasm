import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'react'
import type { WASMWorker } from '../workers/wasm/types'
import { MessageType } from '../workers/wasm/types'
import { OffscreenCanvasFeature } from '../utils/feature-detection'

const initial: IWASMWorkerContext = {
  loaded: false
}

export const WASMWorkerContext = createContext(initial)

export const WASMWorkerContextProvider: React.FC<WASMWorkerContextProviderProps> = ({
  children
}) => {
  const [state, setState] = useState<IWASMWorkerContext>(initial)

  useEffect(() => {
    if (!OffscreenCanvasFeature.available()) {
      setState({ loaded: true, success: false })
      console.error('OffscreenCanvas is not available in the browser!')
      return
    }

    const worker = new Worker(new URL('../workers/wasm/worker', import.meta.url)) as WASMWorker
    worker.onmessage = (event) => {
      switch (event.data.type) {
        case MessageType.ready:
          setState({ loaded: true, success: true, worker })
          break
      }
    }
  }, [])

  return (
    <WASMWorkerContext.Provider value={state}>
      {children}
    </WASMWorkerContext.Provider>
  )
}

interface IWASMWorkerContext {
  loaded: boolean
  success?: boolean
  worker?: WASMWorker
}

interface WASMWorkerContextProviderProps {
  children: ReactNode
}
