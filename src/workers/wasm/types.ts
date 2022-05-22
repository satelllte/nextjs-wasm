export enum MessageType {
  ready,
  add,
  addResult,
}

export type MessageReady = {
  type: MessageType.ready
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
  | MessageAdd
  | MessageAddResult

export interface WASMWorker extends Worker {
  onmessage: ((ev: MessageEvent<Message>) => void) | null
  postMessage(message: Message, transfer: Transferable[]): void
  postMessage(message: Message, options?: StructuredSerializeOptions): void
}
