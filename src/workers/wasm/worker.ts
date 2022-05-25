import { MessageType, MessageAddResult, WASMWorker, MessageReady } from './types'

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
    }
  }

  ctx.postMessage({ type: MessageType.ready } as MessageReady)
})()

export {}
