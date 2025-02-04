export class ContrastCurve {
  readonly low: number = -1
  readonly normal: number = 0.0
  readonly medium: number = 0.5
  readonly high: number = 1.0

  constructor(low: number, normal: number, medium: number, high: number) {
    this.low = low
    this.normal = normal
    this.medium = medium
    this.high = high
  }

  /**
   * Returns the value at a given contrast level.
   *
   * @param contrastLevel The contrast level. 0.0 is the default (normal); -1.0 is the lowest; 1.0 is the highest.
   * @return The value. For contrast ratios, a number between 1.0 and 21.0.
   */
  get(contrastLevel: number): number {
    if (contrastLevel <= this.low) {
      return 1.0
    } else if (contrastLevel <= this.normal) {
      return 4.5
    } else if (contrastLevel <= this.medium) {
      return 7.0
    } else if (contrastLevel <= this.high) {
      return 14.0
    } else {
      return 21.0
    }
  }
}
