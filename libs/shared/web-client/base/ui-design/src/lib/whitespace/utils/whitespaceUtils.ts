import type { WhitespaceSize } from '../abstract/WhitespaceSize';
import { whitespaceSizes } from '../data/whitespaceSizes';

const indexMin = 0;
const indexMax = whitespaceSizes.length - 1;

/**
 * Clamps the provided index to be within the valid range of indices for whitespaceSizes.
 *
 * @param index - The index to clamp.
 * @returns The clamped index.
 */
const clampIndex = (index: number): number => {
  if (index < indexMin) {
    return indexMin;
  } else if (index > indexMax) {
    return indexMax;
  }

  return index;
};

/**
 * Converts a size or index to an index within the bounds of whitespaceSizes.
 *
 * Throws error if the provided size or index is out of bounds.
 *
 * @param sizeOrIndex - The size or index to validate and convert.
 * @returns The valid index.
 */
const sizeOrIndexUnsafeToSafeIndex = (sizeOrIndex: WhitespaceSize | number): number => {
  const index =
    typeof sizeOrIndex === 'number' ? sizeOrIndex : whitespaceSizes.indexOf(sizeOrIndex);

  const indexClamped = clampIndex(index);

  if (index !== indexClamped) {
    throw new Error(
      `Passed index ${index} is out of bounds.` +
        `Valid range is ${indexMin} to ${indexMax}.` +
        `Nearest valid index is ${indexClamped}.`,
    );
  }

  return index;
};

/**
 * Gets the index of the size that is greater than the provided size or index by a certain number of steps, or the maximum index if the desired index is out of bounds.
 *
 * @param sizeOrIndex - The size or index to start from.
 * @param stepsForward - The number of steps to move forward.
 * @returns The index of the size that is greater or the maximum index if out of bounds.
 */
const getSizeIndexGreaterOrMax = (
  sizeOrIndex: WhitespaceSize | number,
  stepsForward: number,
): number => {
  const indexPassed = sizeOrIndexUnsafeToSafeIndex(sizeOrIndex);

  const indexDesired = indexPassed + stepsForward;

  return clampIndex(indexDesired);
};

/**
 * Gets the index of the size that is less than the provided size or index by a certain number of steps, or the minimum index if the desired index is out of bounds.
 *
 * @param sizeOrIndex - The size or index to start from.
 * @param stepsBack - The number of steps to move backward.
 * @returns The index of the size that is less or the minimum index if out of bounds.
 */
const getSizeIndexLessOrMin = (sizeOrIndex: WhitespaceSize | number, stepsBack: number): number => {
  const indexPassed = sizeOrIndexUnsafeToSafeIndex(sizeOrIndex);

  const indexDesired = indexPassed - stepsBack;

  return clampIndex(indexDesired);
};

/**
 * Gets the size that is greater than the provided size by a certain number of steps, or the maximum size if the desired index is out of bounds.
 *
 * @param size - The size to start from.
 * @param stepsForward - The number of steps to move forward.
 * @returns The size that is greater or the maximum size if out of bounds.
 */
const getSizeGreaterOrMax = (size: WhitespaceSize, stepsForward: number): WhitespaceSize => {
  const indexGreaterOrMax = getSizeIndexGreaterOrMax(size, stepsForward);

  return whitespaceSizes[indexGreaterOrMax];
};

/**
 * Gets the size that is less than the provided size by a certain number of steps, or the minimum size if the desired index is out of bounds.
 *
 * @param size - The size to start from.
 * @param stepsBack - The number of steps to move backward.
 * @returns The size that is less or the minimum size if out of bounds.
 */
const getSizeLessOrMin = (size: WhitespaceSize, stepsBack: number): WhitespaceSize => {
  const indexLessOrMin = getSizeIndexLessOrMin(size, stepsBack);

  return whitespaceSizes[indexLessOrMin];
};

export const whitespaceUtils = {
  getSizeGreaterOrMax,
  getSizeLessOrMin,
};
