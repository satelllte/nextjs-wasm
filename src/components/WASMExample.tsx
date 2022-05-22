import { useContext, useEffect, useRef } from "react"
import { WASMContext } from "../context/WASM"
import { OffscreenCanvasFeature } from "../utils/feature-detection"

export const WASMExample = () => {
  const ctx = useContext(WASMContext)

  if (!ctx.wasm) {
    return <>...</>
  }

  return <Canvas wasm={ctx.wasm}/>
}

const Canvas: React.FC<CanvasProps> = ({ wasm }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!OffscreenCanvasFeature.available()) {
      console.error('OffscreenCanvas is not available in the browser!')
    }

    // TODO: add certain type for the messages exchanging between JS main & worker threads
    console.info('loading worker ...')
    const worker = new Worker(new URL('../../workers/wasmWorker', import.meta.url))
    console.info('worker: ', worker)
    worker.onerror = (error) => console.error(error)
    worker.onmessageerror = (messageEvent) => console.warn(messageEvent)
    worker.onmessage = (messageEvent) => console.info(messageEvent)
    worker.postMessage({ // TO FIX: worker isn't loaded at this point yet
      a: 1,
      b: 2,
    })
  }, [])

  useEffect(() => {
    const draw = () => {
      if (!canvasRef.current) return
  
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
  
      if (!ctx) return
  
      wasm.draw(ctx, canvas.width, canvas.height)

      // infinite loop temporary disabled
      // rafIdRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [wasm])

  return <canvas width={600} height={400} ref={canvasRef}/>
}

interface CanvasProps {
  wasm: typeof import('wasm')
}
