import type { ScoreOptions } from '../../utils/score'

export interface QuantizeOptions extends ScoreOptions {
  maxColors?: number
  signal?: AbortSignal
}

export interface QuantizeStartData extends QuantizeOptions {
  type: 'start'
  image: ImageBitmap
}

export interface QuantizeDoneData {
  type: 'done'
  colorToCount: Map<number, number>
  rankedSuggestions: [number, ...number[]]
}

export type QuantizeStartEvent = MessageEvent<QuantizeStartData>

export type QuantizeDoneEvent = MessageEvent<QuantizeDoneData>


export type QuantizeWorkerEvent =
  | QuantizeStartEvent
  | QuantizeDoneEvent

export type QuantizeWorkerData = QuantizeWorkerEvent['data']

export type QuantizeResult = Pick<QuantizeDoneData, 'colorToCount' | 'rankedSuggestions'>
