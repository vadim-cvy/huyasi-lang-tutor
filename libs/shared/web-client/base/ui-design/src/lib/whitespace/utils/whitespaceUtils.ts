import type { WhitespaceSize } from '../abstract/WhitespaceSize';
import { whitespaceSizes } from '../data/whitespaceSizes';

const indexMin = 0;
const indexMax = whitespaceSizes.length - 1;

const clampIndex = (index: number): number => {
  if (index < indexMin) {
    return indexMin;
  } else if (index > indexMax) {
    return indexMax;
  }

  return index;
};

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

const getSizeIndexGreaterOrMax = (
  sizeOrIndex: WhitespaceSize | number,
  stepsForward: number,
): number => {
  const indexPassed = sizeOrIndexUnsafeToSafeIndex(sizeOrIndex);

  const indexDesired = indexPassed + stepsForward;

  return clampIndex(indexDesired);
};

const getSizeIndexLessOrMin = (sizeOrIndex: WhitespaceSize | number, stepsBack: number): number => {
  const indexPassed = sizeOrIndexUnsafeToSafeIndex(sizeOrIndex);

  const indexDesired = indexPassed - stepsBack;

  return clampIndex(indexDesired);
};

const getSizeGreaterOrMax = (size: WhitespaceSize, stepsForward: number): WhitespaceSize => {
  const indexGreaterOrMax = getSizeIndexGreaterOrMax(size, stepsForward);

  return whitespaceSizes[indexGreaterOrMax];
};

const getSizeLessOrMin = (size: WhitespaceSize, stepsBack: number): WhitespaceSize => {
  const indexLessOrMin = getSizeIndexLessOrMin(size, stepsBack);

  return whitespaceSizes[indexLessOrMin];
};

export const whitespaceUtils = {
  getSizeGreaterOrMax,
  getSizeLessOrMin,
};
