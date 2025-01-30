import type {QuantizeWorker} from './types/worker'

export function createQuantizeWorker(): QuantizeWorker {
  return new Worker(
    new URL('./worker.ts', import.meta.url)
  );
}
