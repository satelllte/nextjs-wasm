import { useContext, useEffect, useRef, useState } from "react"
import type { WASM } from "../../types"
import { WASMContext } from "../../context/WASM"

export const WASMCanvasExample = () => {
  const ctx = useContext(WASMContext)

  if (!ctx.wasm) {
    return <>...</>
  }

  return <Canvas wasm={ctx.wasm} />
}

const Canvas: React.FC<CanvasProps> = ({ wasm }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [finished, setFinished] = useState(false)
  const [frames, setFrames] = useState(0)

  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx2d = canvas.getContext('2d')

    if (!ctx2d) return

    const duration = 10000;
    const start = performance.now()
    const end = start + duration
    let time = start
    let frame = 0

    const draw = () => {
      wasm.draw(ctx2d, canvas.width, canvas.height)

      frame++
      time = performance.now()

      if (time < end) {
        requestAnimationFrame(draw)
      } else {
        setFinished(true)
        setFrames(frame)
      }
    }

    draw()
  }, [wasm])

  return (
    <>
      {finished && <span>Frames: {frames}</span>}
      <canvas width={600} height={400} ref={canvasRef}/>
    </>
  )
}

interface CanvasProps {
  wasm: WASM
}
