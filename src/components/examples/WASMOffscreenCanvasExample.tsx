import { useContext, useEffect, useRef } from "react"
import type { OffscreenCanvas } from "../../types"
import { WASMWorkerContext } from "../../context/WASMWorker"
import { MessageCanvas, MessageType, WASMWorker } from "../../workers/wasm/types"

export const WASMOffscreenCanvasExample = () => {
  const ctx = useContext(WASMWorkerContext)

  if (!ctx.loaded) {
    return <>...</>
  }

  if (!ctx.success) {
    return <>OffscreenCanvas is not supported</>
  }

  if (!ctx.worker) {
    return <>Unexpected error occured during WASMWorker load</>
  }

  return <Canvas worker={ctx.worker} />
}

const Canvas: React.FC<CanvasProps> = ({ worker }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const offscreenRef = useRef<OffscreenCanvas | null>(null)

  useEffect(() => {
    console.info('canvasRef.current: ', canvasRef.current)
    const canvas = canvasRef.current
    if (!offscreenRef.current) {
      // @ts-expect-error // Property 'transferControlToOffscreen' does not exist on type 'HTMLCanvasElement'
      offscreenRef.current = canvas.transferControlToOffscreen() as OffscreenCanvas
    }
    const offscreen = offscreenRef.current
    console.info('offscreen: ', offscreen)

    // TODO: !!! fix 2x re-render issue in dev mode so the canvas we refer to isn't there anymore:
    // https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-strict-mode

    // @ts-expect-error // Type 'HTMLCanvasElement' is not assignable to type 'Transferable'
    worker.postMessage({ type: MessageType.canvas, canvas: offscreen } as MessageCanvas, [offscreen])
  }, [])

  return <canvas width={600} height={400} ref={canvasRef}/>
}

interface CanvasProps {
  worker: WASMWorker
}
