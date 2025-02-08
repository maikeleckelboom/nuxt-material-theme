import type { QuantizeDoneEvent, QuantizeStartEvent, QuantizeWorkerEvent } from './types'

export function isStartEvent(event: QuantizeWorkerEvent): event is QuantizeStartEvent {
  return event.data.type === 'start'
}

export function isDoneEvent(event: QuantizeWorkerEvent): event is QuantizeDoneEvent {
  return event.data.type === 'done'
}
