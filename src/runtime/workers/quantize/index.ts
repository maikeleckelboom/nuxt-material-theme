import type { QuantizeWorkerEvent } from './types'

export type QuantizeWorker = Omit<Worker, 'postMessage'> & {
  postMessage(message: QuantizeWorkerEvent['data']): void
}

export function createQuantizeWorker(): QuantizeWorker {
  return new Worker(new URL("./worker.ts", import.meta.url), { type: "module" });
}
