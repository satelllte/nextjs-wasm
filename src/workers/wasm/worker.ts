import { MessageType, MessageAddResult, WASMWorker, MessageReady, MessageFinish } from './types'

(async() => {
  const wasm = await import('wasm')
  await wasm.default()

  const ctx = self as unknown as WASMWorker

  ctx.onmessage = (event) => {
    switch(event.data.type) {
      case MessageType.add:
        const { a, b } = event.data.props
        const result = wasm.add(a, b)
        ctx.postMessage({ type: MessageType.addResult, result } as MessageAddResult)
        break
      case MessageType.canvas:
        const { canvas } = event.data
        const ctx2d = canvas.getContext('2d')

        if (!ctx2d) {
          throw new Error('Couldn\'t get OffscreenCanvas 2D context')
        }

        const duration = 10000
        const start = performance.now()
        const end = start + duration
        let time = start
        let frame = 0

        const draw = () => {
          wasm.draw_random_pixels(ctx2d, canvas.width, canvas.height)
          
          frame++
          time = performance.now()

          if (time < end) {
            requestAnimationFrame(draw)
          } else {
            ctx.postMessage({ type: MessageType.finish, frames: frame } as MessageFinish)
          }
        }

        requestAnimationFrame(draw)

        break
    }
  }

  ctx.postMessage({ type: MessageType.ready } as MessageReady)
})()

export {}
