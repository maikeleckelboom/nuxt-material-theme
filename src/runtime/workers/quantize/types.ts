export interface QuantizeStartData {
  type: 'start'
  source: ImageBitmapSource
  maxColors?: number
  filter?: boolean
  desired?: number
  fallbackColorARGB?: number
}

export interface QuantizeDoneData {
  type: 'done'
  colorToCount: Map<number, number>
  rankedSuggestions: [number, ...number[]]
}

export interface QuantizeProgressData {
  type: 'progress'
  progress: number
}

export type QuantizeStartEvent = MessageEvent<QuantizeStartData>

export type QuantizeDoneEvent = MessageEvent<QuantizeDoneData>

export type QuantizeProgressEvent = MessageEvent<QuantizeProgressData>

export type QuantizeWorkerEvent =
  | QuantizeStartEvent
  | QuantizeDoneEvent
  | QuantizeProgressEvent

export type QuantizeResult = Pick<QuantizeDoneData, 'colorToCount' | 'rankedSuggestions'>
