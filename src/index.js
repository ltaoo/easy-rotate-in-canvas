/**
 * 检查参数是否合法
 * @param {any} param - 参数
 * @return {boolan}
 */
function isValidatedParam(param) {
    return typeof param === 'number';
}

function computeXAndY(x, y, rotate) {
    if (x === 0 && y === 0) {
        return [x, y];
    }
    const hypotenuse = Math.sqrt(x ** 2 + y ** 2);
    const cos = x / hypotenuse;
    // 用反三角函数求弧度
    const radina = Math.acos(cos);
    // 将弧度转换成角度
    const angle = Math.floor(180 / (Math.PI / radina));

    console.log(angle, rotate);
    if (angle === rotate) {
        return [hypotenuse, 0];
    }

    if (rotate > 0 && rotate < 90) {
        if (angle > rotate) {
            const totalAngle = angle - rotate;
            const realX = Math.cos(totalAngle * (Math.PI / 180)) * hypotenuse;
            const realY = Math.sin(totalAngle * (Math.PI / 180)) * hypotenuse;
            return [realX, realY];
        }
        const totalAngle = angle + rotate;
        const realX = Math.sin(totalAngle * (Math.PI / 180)) * hypotenuse;
        const realY = Math.cos(totalAngle * (Math.PI / 180)) * hypotenuse;
        return [realX, -realY];
    }

    if (rotate >= 90 && rotate <= 180) {
        if (angle > rotate) {
            const totalAngle = angle - rotate - 90;
            const realX = Math.cos(totalAngle * (Math.PI / 180)) * hypotenuse;
            const realY = Math.sin(totalAngle * (Math.PI / 180)) * hypotenuse;

            return [realX, realY];
        }
        const totalAngle = angle - rotate - 90;
        const realX = Math.sin(totalAngle * (Math.PI / 180)) * hypotenuse;
        const realY = Math.cos(totalAngle * (Math.PI / 180)) * hypotenuse;

        return [-realX, realY];
    }

    if (rotate > 180 && rotate < 270) {
        if (angle > rotate) {
            const totalAngle = angle + rotate - 180;
            const realX = Math.cos(totalAngle * (Math.PI / 180)) * hypotenuse;
            const realY = Math.sin(totalAngle * (Math.PI / 180)) * hypotenuse;

            return [realX, realY];
        }
        const totalAngle = angle + rotate - 180;
        const realX = Math.sin(totalAngle * (Math.PI / 180)) * hypotenuse;
        const realY = Math.cos(totalAngle * (Math.PI / 180)) * hypotenuse;

        return [-realX, realY];
    }
    if (angle > rotate) {
        const totalAngle = angle - rotate - 270;
        const realX = Math.cos(totalAngle * (Math.PI / 180)) * hypotenuse;
        const realY = Math.sin(totalAngle * (Math.PI / 180)) * hypotenuse;

        return [realX, realY];
    }
    const totalAngle = angle - rotate - 270;
    const realX = Math.sin(totalAngle * (Math.PI / 180)) * hypotenuse;
    const realY = Math.cos(totalAngle * (Math.PI / 180)) * hypotenuse;

    return [realX, -realY];
}

class EnhancedCtx {
    constructor(ctx) {
        this.originalCtx = ctx;
    }

    drawImage(img, options) {
        const ctx = this.originalCtx;
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
}

export default function enhance(ctx) {
    return new EnhancedCtx(ctx);
}
