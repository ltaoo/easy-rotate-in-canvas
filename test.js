import { computeXAndY } from './src/index';

describe('compute x and y by rotate', () => {
    test('0', () => {
        expect(true).toBe(true);
    });

    test('1、x === 0 and y === 0', () => {
        const result = computeXAndY(0, 0, 0);

        expect(result).toEqual([0, 0]);
    });

    test('2、旋转角度等于图片位置', () => {
        const result = computeXAndY(100, 100, 45);

        expect(result).toEqual([141.42, 0]);
    });

    test('3、旋转角度小于 90', () => {
        const result = computeXAndY(0, 0, 50);

        expect(result).toEqual([0, 0]);
    });
});
