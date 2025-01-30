import type { QuantizeWorkerEvent } from './events'

export type QuantizeWorker = Omit<Worker, 'postMessage'> & {
  postMessage(message: QuantizeWorkerEvent['data']): void
}
