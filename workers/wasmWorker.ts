// TODO: enable top-level avait
(async() => {
  const wasm = await import('wasm')
  await wasm.default()

  self.onmessage = async (event) => { // TODO: add certain type for the message event
    console.info('worker.onmessage -> event: ', event)
  
    const result = wasm.add(event.data.a, event.data.b)
  
    console.info('result from WASM: ', result)
  
    self.postMessage(result)
  }
})()

export {}
