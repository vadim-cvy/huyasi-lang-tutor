import { sizesAll } from '../data/sizesAll';
import { SizesNavigator } from './SizesNavigator';

const sizesNavigatorFull = new SizesNavigator(sizesAll);
const sizesNavigatorSubset = new SizesNavigator(['sm', 'md', 'lg', 'xl']);

describe('SizesNavigator', () => {
  describe('constructor', () => {
    it('should fail when sizes array is empty', () => {
      expect(() => new SizesNavigator([])).toThrowError();
    });

    it('should fail when sizes are out of order', () => {
      expect(() => new SizesNavigator(['lg', 'md'])).toThrowError();
    });

    it('should fail when there are duplicated sizes', () => {
      expect(() => new SizesNavigator(['sm', 'md', 'md', 'lg'])).toThrowError();
    });
  });

  describe('getSizeGreaterOrMax', () => {
    it('returns a larger size by the given number of steps', () => {
      const stepsForward = 2;
      expect(sizesNavigatorFull.getSizeGreaterOrMax('sm', stepsForward)).toBe('lg');
      expect(sizesNavigatorSubset.getSizeGreaterOrMax('sm', stepsForward)).toBe('lg');
    });

    it('returns the same size when steps are zero', () => {
      const stepsForward = 0;
      expect(sizesNavigatorFull.getSizeGreaterOrMax('md', stepsForward)).toBe('md');
      expect(sizesNavigatorSubset.getSizeGreaterOrMax('md', stepsForward)).toBe('md');
    });

    it('returns max size when desired index is out of bounds', () => {
      const stepsForward = 10;
      expect(sizesNavigatorFull.getSizeGreaterOrMax('md', stepsForward)).toBe('2xl');
      expect(sizesNavigatorSubset.getSizeGreaterOrMax('md', stepsForward)).toBe('xl');
    });
  });

  describe('getSizeLessOrMin', () => {
    it('returns a smaller size by the given number of steps', () => {
      const stepsBackward = 2;
      expect(sizesNavigatorFull.getSizeLessOrMin('xl', stepsBackward)).toBe('md');
      expect(sizesNavigatorSubset.getSizeLessOrMin('xl', stepsBackward)).toBe('md');
    });

    it('returns the same size when steps are zero', () => {
      const stepsBackward = 0;
      expect(sizesNavigatorFull.getSizeLessOrMin('md', stepsBackward)).toBe('md');
      expect(sizesNavigatorSubset.getSizeLessOrMin('md', stepsBackward)).toBe('md');
    });

    it('returns min size when desired index is out of bounds', () => {
      const stepsBackward = 10;
      expect(sizesNavigatorFull.getSizeLessOrMin('md', stepsBackward)).toBe('xs');
      expect(sizesNavigatorSubset.getSizeLessOrMin('md', stepsBackward)).toBe('sm');
    });
  });
});
