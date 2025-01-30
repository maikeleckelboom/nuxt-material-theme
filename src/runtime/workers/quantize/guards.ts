import type {
  QuantizeWorkerEvent,
  QuantizeStartEvent,
  QuantizeProgressEvent,
  QuantizeDoneEvent
} from './types/events'

export function isStartEvent(event: QuantizeWorkerEvent): event is QuantizeStartEvent {
  return event.data.type === 'start'
}

export function isProgressEvent(event: QuantizeWorkerEvent): event is QuantizeProgressEvent {
  return event.data.type === 'progress'
}

export function isDoneEvent(event: QuantizeWorkerEvent): event is QuantizeDoneEvent {
  return event.data.type === 'done'
}
