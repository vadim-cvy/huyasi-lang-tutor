import type { WhitespaceSize } from '../abstract/WhitespaceSize';
import { whitespaceSizes } from '../data/whitespaceSizes';

const getSizeIndex = (size: WhitespaceSize): number => whitespaceSizes.indexOf(size);

const getSizeIndexGreaterOrMax = (
  sizeOrIndex: WhitespaceSize | number,
  stepsForward: number,
): number => {
  const indexCurrent = typeof sizeOrIndex === 'number' ? sizeOrIndex : getSizeIndex(sizeOrIndex);

  const indexTarget = indexCurrent + stepsForward;
  const indexMax = whitespaceSizes.length - 1;

  return Math.min(indexTarget, indexMax);
};

const getSizeIndexLessOrMin = (sizeOrIndex: WhitespaceSize | number, stepsBack: number): number => {
  const indexCurrent = typeof sizeOrIndex === 'number' ? sizeOrIndex : getSizeIndex(sizeOrIndex);

  const indexTarget = indexCurrent - stepsBack;
  const indexMin = 0;

  return Math.max(indexTarget, indexMin);
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
  getSizeIndex,
  getSizeIndexGreaterOrMax,
  getSizeIndexLessOrMin,
  getSizeGreaterOrMax,
  getSizeLessOrMin,
};
