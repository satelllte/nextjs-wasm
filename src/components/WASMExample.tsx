import { useContext, useEffect, useRef } from "react"
import { WASMContext } from "../context/WASM"
import type { WASM } from "../types"
import type { MessageAdd, WASMWorker } from "../workers/wasm/types"
import { MessageType } from "../workers/wasm/types"
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

    const worker = new Worker(new URL('../workers/wasm/worker', import.meta.url)) as WASMWorker
    worker.onmessage = (event) => {
      switch (event.data.type) {
        case MessageType.ready:
          worker.postMessage({
            type: MessageType.add,
            props: { a: 4, b: 8 },
          } as MessageAdd)
          break
        case MessageType.addResult:
          const { result } = event.data
          console.info('result from worker + wasm: ', result)
          break
      }
    }
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
  wasm: WASM
}
