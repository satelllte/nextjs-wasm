import { useContext, useEffect, useRef } from "react"
import { WASMContext } from "../context/WASM"

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
    const draw = () => {
      if (!canvasRef.current) return
  
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
  
      if (!ctx) return
  
      wasm.draw(ctx, canvas.width, canvas.height)

      rafIdRef.current = requestAnimationFrame(draw)
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
