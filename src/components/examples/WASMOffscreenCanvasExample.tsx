import { useContext, useRef } from "react"
import { WASMWorkerContext } from "../../context/WASMWorker"
import { WASMWorker } from "../../workers/wasm/types"

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

  return <canvas width={600} height={400} ref={canvasRef}/>
}

interface CanvasProps {
  worker: WASMWorker
}
