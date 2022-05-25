import type { OffscreenCanvas } from '../../types'

export enum MessageType {
  ready,
  canvas,
  add,
  addResult,
}

export type MessageReady = {
  type: MessageType.ready
}

export type MessageCanvas = {
  type: MessageType.canvas
  canvas: OffscreenCanvas
}

export type MessageAdd = {
  type: MessageType.add
  props: {
    a: number
    b: number
  }
}

export type MessageAddResult = {
  type: MessageType.addResult
  result: number
}

export type Message =
  | MessageReady
  | MessageCanvas
  | MessageAdd
  | MessageAddResult

export interface WASMWorker extends Worker {
  onmessage: ((ev: MessageEvent<Message>) => void) | null
  postMessage(message: Message, transfer: Transferable[]): void
  postMessage(message: Message, options?: StructuredSerializeOptions): void
}
