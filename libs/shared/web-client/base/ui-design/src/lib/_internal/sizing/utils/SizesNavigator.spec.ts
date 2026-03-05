import { sizesAll } from '../data/sizesAll';
import { SizesNavigator } from './SizesNavigator';

const sizesNavigator = new SizesNavigator(sizesAll);

describe('SizesNavigator', () => {
  // FIXME: add test for invalid sizes subset in constructor

  // FIXME: add test which ensures that sizes which are not presented in subset won't be returned by getSize... methods

  describe('getSizeGreaterOrMax', () => {
    it('returns a larger size by the given number of steps', () => {
      const stepsForward = 2;
      expect(sizesNavigator.getSizeGreaterOrMax('sm', stepsForward)).toBe('lg');
    });

    it('returns the same size when steps are zero', () => {
      const stepsForward = 0;
      expect(sizesNavigator.getSizeGreaterOrMax('md', stepsForward)).toBe('md');
    });

    it('returns max size when desired index is out of bounds', () => {
      const stepsForward = 10;
      expect(sizesNavigator.getSizeGreaterOrMax('xl', stepsForward)).toBe('2xl');
    });
  });

  describe('getSizeLessOrMin', () => {
    it('returns a smaller size by the given number of steps', () => {
      const stepsBackward = 2;
      expect(sizesNavigator.getSizeLessOrMin('xl', stepsBackward)).toBe('md');
    });

    it('returns the same size when steps are zero', () => {
      const stepsBackward = 0;
      expect(sizesNavigator.getSizeLessOrMin('md', stepsBackward)).toBe('md');
    });

    it('returns min size when desired index is out of bounds', () => {
      const stepsBackward = 10;
      expect(sizesNavigator.getSizeLessOrMin('sm', stepsBackward)).toBe('xs');
    });
  });
});
