import { whitespaceUtils } from './whitespaceUtils';

describe('whitespaceUtils', () => {
  describe('getSizeGreaterOrMax', () => {
    it('returns a larger size by the given number of steps', () => {
      const stepsForward = 2;
      expect(whitespaceUtils.getSizeGreaterOrMax('sm', stepsForward)).toBe('lg');
    });

    it('returns the same size when steps are zero', () => {
      const stepsForward = 0;
      expect(whitespaceUtils.getSizeGreaterOrMax('md', stepsForward)).toBe('md');
    });

    it('returns max size when desired index is out of bounds', () => {
      const stepsForward = 10;
      expect(whitespaceUtils.getSizeGreaterOrMax('xl', stepsForward)).toBe('2xl');
    });
  });

  describe('getSizeLessOrMin', () => {
    it('returns a smaller size by the given number of steps', () => {
      const stepsBackward = 2;
      expect(whitespaceUtils.getSizeLessOrMin('xl', stepsBackward)).toBe('md');
    });

    it('returns the same size when steps are zero', () => {
      const stepsBackward = 0;
      expect(whitespaceUtils.getSizeLessOrMin('md', stepsBackward)).toBe('md');
    });

    it('returns min size when desired index is out of bounds', () => {
      const stepsBackward = 10;
      expect(whitespaceUtils.getSizeLessOrMin('sm', stepsBackward)).toBe('xs');
    });
  });
});
