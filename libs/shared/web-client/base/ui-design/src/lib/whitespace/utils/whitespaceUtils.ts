import type { WhitespaceSize } from '../abstract/WhitespaceSize';
import { whitespaceSizes } from '../data/whitespaceSizes';

const indexMin = 0;
const indexMax = whitespaceSizes.length - 1;

const _clampIndex = (index: number): number => {
  if (index < indexMin) {
    return indexMin;
  } else if (index > indexMax) {
    return indexMax;
  }

  return index;
};

const _sizeOrIndexUnsafeToSafeIndex = (sizeOrIndex: WhitespaceSize | number): number => {
  const index =
    typeof sizeOrIndex === 'number' ? sizeOrIndex : whitespaceSizes.indexOf(sizeOrIndex);

  const indexClamped = _clampIndex(index);

  if (index !== indexClamped) {
    throw new Error(
      `Passed index ${index} is out of bounds.` +
        `Valid range is ${indexMin} to ${indexMax}.` +
        `Nearest valid index is ${indexClamped}.`,
    );
  }

  return index;
};

const _getSizeIndexGreaterOrMax = (
  sizeOrIndex: WhitespaceSize | number,
  stepsForward: number,
): number => {
  const indexPassed = _sizeOrIndexUnsafeToSafeIndex(sizeOrIndex);

  const indexDesired = indexPassed + stepsForward;

  return _clampIndex(indexDesired);
};

const _getSizeIndexLessOrMin = (
  sizeOrIndex: WhitespaceSize | number,
  stepsBack: number,
): number => {
  const indexPassed = _sizeOrIndexUnsafeToSafeIndex(sizeOrIndex);

  const indexDesired = indexPassed - stepsBack;

  return _clampIndex(indexDesired);
};

const getSizeGreaterOrMax = (size: WhitespaceSize, stepsForward: number): WhitespaceSize => {
  const indexGreaterOrMax = _getSizeIndexGreaterOrMax(size, stepsForward);

  return whitespaceSizes[indexGreaterOrMax];
};

const getSizeLessOrMin = (size: WhitespaceSize, stepsBack: number): WhitespaceSize => {
  const indexLessOrMin = _getSizeIndexLessOrMin(size, stepsBack);

  return whitespaceSizes[indexLessOrMin];
};

export const whitespaceUtils = {
  getSizeGreaterOrMax,
  getSizeLessOrMin,
};
