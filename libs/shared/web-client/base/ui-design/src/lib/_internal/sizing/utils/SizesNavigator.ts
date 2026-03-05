import type { Size } from '../abstract/Size';
import { sizesAll } from '../data/sizesAll';

export class SizesNavigator<Sizes extends readonly Size[]> {
  public constructor(private readonly sizesSubset: Sizes) {
    this.validateSizesSubset();
  }

  /**
   * Validates that the sizes subset passed into the constructor is valid.
   */
  private validateSizesSubset(): void {
    if (this.sizesSubset.length === 0) {
      throw new Error('Sizes subset must not be empty.');
    }

    let lastIndexInSizesAll: number | undefined;

    for (const size of this.sizesSubset) {
      const indexInSizesAll = sizesAll.indexOf(size);

      if (indexInSizesAll === -1) {
        throw new Error(`Size "${size}" is not found in sizesAll.`);
      }

      const expectedIndexInSizesAll =
        lastIndexInSizesAll === undefined ? indexInSizesAll : lastIndexInSizesAll + 1;

      if (indexInSizesAll !== expectedIndexInSizesAll) {
        const indexInSizesSubset = this.sizesSubset.indexOf(size);
        const previousSize = this.sizesSubset[indexInSizesSubset - 1];
        const expectedSize = sizesAll[expectedIndexInSizesAll];

        throw new Error(
          'Sizes subset is not in the correct order or one of the sizes is missing.' +
            ` Expected size "${expectedSize}" at index ${indexInSizesSubset} after size "${previousSize}",` +
            ` but got size "${size}".` +
            ' Example of a valid sizes subset: ["md", "lg", "xl"] - is ordered correctly, no missing sizes in between.' +
            ' Example of an invalid sizes subset: ["lg", "md"] - is not ordered correctly, must be ["md", "lg"].' +
            ' Example of an invalid sizes subset: ["xs", "md"] - has missing size "sm" in between, must be ["xs", "sm", "md"].',
        );
      }

      lastIndexInSizesAll = indexInSizesAll;
    }
  }

  /**
   * Gets the index of the size that is greater than the provided size by a certain number of steps, or the maximum index if the desired index is out of bounds.
   *
   * @param size - The size to start from.
   * @param stepsForward - The number of steps to move forward.
   * @returns The index of the size that is greater or the maximum index if out of bounds.
   */
  private getSizeIndexGreaterOrMax(size: Sizes[number], stepsForward: number): number {
    const index = this.sizesSubset.indexOf(size);

    const indexDesired = index + stepsForward;

    return Math.min(indexDesired, this.sizesSubset.length - 1);
  }

  /**
   * Gets the index of the size that is less than the provided size by a certain number of steps, or the minimum index if the desired index is out of bounds.
   *
   * @param size - The size to start from.
   * @param stepsBack - The number of steps to move backward.
   * @returns The index of the size that is less or the minimum index if out of bounds.
   */
  private getSizeIndexLessOrMin(size: Sizes[number], stepsBack: number): number {
    const index = this.sizesSubset.indexOf(size);

    const indexDesired = index - stepsBack;

    return Math.max(indexDesired, 0);
  }

  /**
   * Gets the size that is greater than the provided size by a certain number of steps, or the maximum size if the desired index is out of bounds.
   *
   * @param size - The size to start from.
   * @param stepsForward - The number of steps to move forward.
   * @returns The size that is greater or the maximum size if out of bounds.
   */
  public getSizeGreaterOrMax(size: Sizes[number], stepsForward: number): Sizes[number] {
    const indexGreaterOrMax = this.getSizeIndexGreaterOrMax(size, stepsForward);

    return this.sizesSubset[indexGreaterOrMax];
  }

  /**
   * Gets the size that is less than the provided size by a certain number of steps, or the minimum size if the desired index is out of bounds.
   *
   * @param size - The size to start from.
   * @param stepsBack - The number of steps to move backward.
   * @returns The size that is less or the minimum size if out of bounds.
   */
  public getSizeLessOrMin(size: Sizes[number], stepsBack: number): Sizes[number] {
    const indexLessOrMin = this.getSizeIndexLessOrMin(size, stepsBack);

    return this.sizesSubset[indexLessOrMin];
  }
}
