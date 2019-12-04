import { computeXAndY } from './src/index';

describe('compute x and y by rotate', () => {
    test('0', () => {
        expect(true).toBe(true);
    });

    test('1、x === 0 and y === 0', () => {
        const result = computeXAndY(0, 0, 0);

        expect(result).toEqual([0, 0]);
    });

    test('2、旋转角度等于图片角度', () => {
        const result = computeXAndY(100, 100, 45);

        expect(result).toEqual([141.42, 0]);
    });

    test('3、旋转角度小于 90 且图片角度小于旋转角度', () => {
        const result = computeXAndY(60, 10, 50);

        expect(result).toEqual([45.91, -39.91]);
    });

    test('4、旋转角度小于 90 且图片角度大于旋转角度', () => {
        const result = computeXAndY(10, 60, 50);

        expect(result).toEqual([52.68, 30.41]);
    });

    test('5、旋转角度等于 90', () => {
        const result = computeXAndY(10, 60, 90);

        expect(result).toEqual([60, -10]);
    });

    test('6、旋转角度小于 180 且图片角度小于旋转角度', () => {
        const result = computeXAndY(10, 60, 120);

        expect(result).toEqual([46.6, -39.1]);
    });

    test('7、旋转角度小于 180 且图片角度大于旋转角度', () => {
        const result = computeXAndY(60, 10, 120);

        expect(result).toEqual([-21.8, -56.79]);
    });
    test('8、旋转角度等于 180', () => {
        const result = computeXAndY(60, 10, 180);

        expect(result).toEqual([-60.08, -9.52]);
    });
    test('9、旋转角度小于 270 且图片角度小于旋转角度', () => {
        const result = computeXAndY(60, 10, 220);

        expect(result).toEqual([-52.14, 31.33]);
    });
    test('10、旋转角度小于 270 且图片角度大于旋转角度', () => {
        const result = computeXAndY(10, 60, 220);

        expect(result).toEqual([-46.6, -39.1]);
    });
    test('11、旋转角度等于 270', () => {
        const result = computeXAndY(10, 60, 270);

        expect(result).toEqual([-60, 10]);
    });
    test('12、旋转角度小于 360 且图片角度小于旋转角度', () => {
        const result = computeXAndY(60, 10, 300);

        expect(result).toEqual([21.8, 56.79]);
    });
    test('13、旋转角度小于 360 且图片角度大于旋转角度', () => {
        const result = computeXAndY(10, 60, 300);

        expect(result).toEqual([-46.6, 39.1]);
    });
    test('14、旋转角度等于 360', () => {
        const result = computeXAndY(10, 60, 360);

        expect(result).toEqual([10, 60]);
    });

    test('15、旋转角度等于 0', () => {
        const result = computeXAndY(10, 60, 0);

        expect(result).toEqual([10, 60]);
    });
});
