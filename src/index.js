/**
 * 检查参数是否合法
 * @param {any} param - 参数
 * @return {boolan}
 */
function isValidatedParam(param) {
    return typeof param === 'number';
}

/**
 * 保留两位小数
 * @param {number} number
 */
function toFix(number) {
    return Number(number.toFixed(2));
}

function fixArr(ary) {
    return ary.map(toFix);
}

export function computeXAndY(x, y, rotate) {
    if (x === 0 && y === 0) {
        return [x, y];
    }
    if (rotate === 90) {
        // console.log('case 5');
        // 4、旋转角度等于 90
        return fixArr([y, -x]);
    }
    if (rotate === 270) {
        // console.log('case 11');
        // 11、旋转角度等于 270
        return fixArr([-y, x]);
    }
    if (rotate === 360 || rotate === 0) {
        return [x, y];
    }

    const hypotenuse = Math.sqrt(x ** 2 + y ** 2);
    const cos = x / hypotenuse;
    // 用反三角函数求弧度
    const radina = Math.acos(cos);
    // 将弧度转换成角度
    const angle = Math.floor(180 / (Math.PI / radina));

    // console.log(angle, rotate);
    let result = [0, 0];
    if (angle === rotate) {
        // 2、旋转角度等于图片角度
        return fixArr([hypotenuse, 0]);
    }

    if (rotate > 0 && rotate < 90) {
        if (angle > rotate) {
            // console.log('case 3');
            // 3、旋转角度小于 90 且图片角度大于旋转角度
            const totalAngle = angle - rotate;
            const realX = Math.cos(totalAngle * (Math.PI / 180)) * hypotenuse;
            const realY = Math.sin(totalAngle * (Math.PI / 180)) * hypotenuse;
            return fixArr([realX, realY]);
        }
        // console.log('case 4');
        // 4、旋转角度小于 90 且图片角度小于旋转角度
        const totalAngle = rotate - angle;
        const realX = Math.cos(totalAngle * (Math.PI / 180)) * hypotenuse;
        const realY = Math.sin(totalAngle * (Math.PI / 180)) * hypotenuse;
        return fixArr([realX, -realY]);
    }
    if (rotate > 90 && rotate <= 180) {
        if (angle > rotate) {
            // 7、旋转角度小于 180 且图片角度大于旋转角度
            const totalAngle = angle - rotate - 90;
            const realX = Math.cos(totalAngle * (Math.PI / 180)) * hypotenuse;
            const realY = Math.sin(totalAngle * (Math.PI / 180)) * hypotenuse;

            return fixArr([realX, realY]);
        }
        // 6、旋转角度小于 180 且图片角度小于旋转角度
        const totalAngle = angle - rotate - 90;
        const realX = Math.sin(totalAngle * (Math.PI / 180)) * hypotenuse;
        const realY = Math.cos(totalAngle * (Math.PI / 180)) * hypotenuse;
        return fixArr([-realX, realY]);
    }

    if (rotate > 180 && rotate < 270) {
        if (angle > rotate) {
            const totalAngle = angle + rotate - 180;
            const realX = Math.cos(totalAngle * (Math.PI / 180)) * hypotenuse;
            const realY = Math.sin(totalAngle * (Math.PI / 180)) * hypotenuse;

            return fixArr([realX, realY]);
        }
        const totalAngle = angle + 270 - rotate;
        const realX = Math.sin(totalAngle * (Math.PI / 180)) * hypotenuse;
        const realY = Math.cos(totalAngle * (Math.PI / 180)) * hypotenuse;

        return fixArr([-realX, realY]);
    }
    if (rotate > 270 && rotate < 360) {
        if (angle > rotate) {
            const totalAngle = angle - rotate - 270;
            const realX = Math.cos(totalAngle * (Math.PI / 180)) * hypotenuse;
            const realY = Math.sin(totalAngle * (Math.PI / 180)) * hypotenuse;

            result = [realX, realY];
        } else {
            const totalAngle = angle - rotate - 270;
            const realX = Math.sin(totalAngle * (Math.PI / 180)) * hypotenuse;
            const realY = Math.cos(totalAngle * (Math.PI / 180)) * hypotenuse;

            result = [realX, -realY];
        }
    }


    return result.map(toFix);
}

function drawImage(ctx, img, options) {
    const {
        x,
        y,
        width,
        height,
        crop,
        scale,
        rotate,
    } = options;
    if (isValidatedParam(scale)) {
        ctx.scale(scale, scale);
    }
    let lastX = x;
    let lastY = y;
    if (isValidatedParam(rotate)) {
        ctx.rotate(rotate * (Math.PI / 180));
        [lastX, lastY] = computeXAndY(x, y, rotate);
    }

    const applyParams = [img];

    if (crop !== undefined && typeof crop === 'object') {
        const {
            x: cropX, y: cropY, width: cropWidth, height: cropHeight,
        } = crop;
        if (
            isValidatedParam(cropX) && isValidatedParam(cropY)
            && isValidatedParam(cropWidth) && isValidatedParam(cropHeight)
        ) {
            applyParams.push(cropX, cropY, cropWidth, cropHeight);
        }
    }

    applyParams.push(lastX, lastY);

    if (isValidatedParam(width) && isValidatedParam(height)) {
        applyParams.push(width, height);
    }

    ctx.drawImage(...applyParams);

    if (isValidatedParam(rotate)) {
        ctx.rotate(-rotate * (Math.PI / 180));
    }
}

export default function enhance(ctx) {
    return new Proxy(ctx, {
        get(target, key) {
            if (key === 'drawImage') {
                return drawImage.bind(null, target);
            }
            return target[key].bind(target);
        },
        set(target, key, value) {
            target[key] = value;
        },
    });
}
