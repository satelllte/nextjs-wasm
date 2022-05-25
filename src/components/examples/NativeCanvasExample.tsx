import { useEffect, useRef, useState } from "react"
import { randomUInt8 } from "../../utils/random"

export const NativeCanvasExample = () => {
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
      drawRandomPixels(ctx2d, canvas.width, canvas.height)

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
  }, [])

  return (
    <>
      {finished && <span>Frames: {frames}</span>}
      <canvas width={600} height={400} ref={canvasRef}/>
    </>
  )
}

const drawRandomPixels = (ctx2d: CanvasRenderingContext2D, width: number, height: number) => {
  const imageData = ctx2d.getImageData(0, 0, width, height)
  const { data } = imageData
  for (let i = 0; i < data.length; i += 4) {
    data[i] = randomUInt8()
    data[i+1] = randomUInt8()
    data[i+2] = randomUInt8()
    data[i+3] = 255
  }
  ctx2d.putImageData(imageData, 0, 0)
}
