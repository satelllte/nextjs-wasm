export type WASM = typeof import('wasm')
export type OffscreenCanvas = HTMLCanvasElement // at this moment, typescript@4.7.2 has OffscreenCanvas type deprecated, so for now we're just falling back to default canvas
