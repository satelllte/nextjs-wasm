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
  const fpsRef = useRef<number>(0)

  useEffect(() => {
    const draw = () => {
      const start = performance.now()

      if (!canvasRef.current) return
  
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
  
      if (!ctx) return
  
      wasm.draw(ctx, canvas.width, canvas.height)
  
      const end = performance.now()
      fpsRef.current = 1000 / (end - start)

      rafIdRef.current = requestAnimationFrame(draw)
    }

    const logFPS = () => {
      console.info(`Canvas | FPS: ${fpsRef.current.toFixed(3)}`)
    }

    draw()

    const intervalId = setInterval(logFPS, 1000)

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      clearInterval(intervalId)
    }
  }, [wasm])

  return <canvas width={500} height={200} ref={canvasRef}/>
}

interface CanvasProps {
  wasm: typeof import('wasm')
}
