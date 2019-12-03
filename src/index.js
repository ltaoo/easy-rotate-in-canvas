class EnhancedCtx {
    constructor(ctx) {
        this.originalCtx = ctx;
    }
    drawImage(img, options) {
        const ctx = this.originalCtx;
        const { x, y, scale, rotate } = options;
        if (typeof scale === 'number') {
            ctx.scale(scale, scale);
        }
        let lastX = x;
        let lastY = y;
        if (typeof rotate === 'number') {
            ctx.rotate(rotate * Math.PI / 180);
            const hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

            const cos = x / hypotenuse;
            // 用反三角函数求弧度
            const radina = Math.acos(cos);
            // 将弧度转换成角度
            const angle = Math.floor(180 / (Math.PI / radina));
            console.log('angle of image', angle, rotate);

            if (rotate > 0 && rotate < 90) {
                if (angle === rotate) {
                    lastX = hypotenuse;
                    lastY = 0;
                } else if (angle > rotate) {
                    const totalAngle = angle - rotate;
                    const realX = Math.cos(totalAngle * Math.PI / 180) * hypotenuse;
                    const realY = Math.sin(totalAngle * Math.PI / 180) * hypotenuse;

                    lastX = realX;
                    lastY = realY;
                } else {
                    const totalAngle = angle + rotate;
                    const realX = Math.sin(totalAngle * Math.PI / 180) * hypotenuse;
                    const realY = Math.cos(totalAngle * Math.PI / 180) * hypotenuse;

                    lastX = realX;
                    lastY = -realY;
                }
            } else if (rotate >= 90 && rotate <= 180) {
                if (angle === rotate) {
                    lastX = hypotenuse;
                    lastY = 0;
                } else if (angle > rotate) {
                    const totalAngle = angle - rotate - 90;
                    const realX = Math.cos(totalAngle * Math.PI / 180) * hypotenuse;
                    const realY = Math.sin(totalAngle * Math.PI / 180) * hypotenuse;

                    lastX = realX;
                    lastY = realY;
                } else {
                    const totalAngle = angle - rotate - 90;
                    const realX = Math.sin(totalAngle * Math.PI / 180) * hypotenuse;
                    const realY = Math.cos(totalAngle * Math.PI / 180) * hypotenuse;

                    lastX = -realX;
                    lastY = realY;
                }
            } else if (rotate > 180 && rotate < 270) {
                if (angle === rotate) {
                    lastX = hypotenuse;
                    lastY = 0;
                } else if (angle > rotate) {
                    const totalAngle = angle + rotate - 180;
                    const realX = Math.cos(totalAngle * Math.PI / 180) * hypotenuse;
                    const realY = Math.sin(totalAngle * Math.PI / 180) * hypotenuse;

                    lastX = realX;
                    lastY = realY;
                } else {
                    const totalAngle = angle + rotate - 180;
                    console.log(totalAngle);
                    const realX = Math.sin(totalAngle * Math.PI / 180) * hypotenuse;
                    const realY = Math.cos(totalAngle * Math.PI / 180) * hypotenuse;

                    lastX = -realX;
                    lastY = realY;
                }
            } else {
                if (angle === rotate) {
                    lastX = hypotenuse;
                    lastY = 0;
                } else if (angle > rotate) {
                    const totalAngle = angle - rotate - 270;
                    const realX = Math.cos(totalAngle * Math.PI / 180) * hypotenuse;
                    const realY = Math.sin(totalAngle * Math.PI / 180) * hypotenuse;

                    lastX = realX;
                    lastY = realY;
                } else {
                    const totalAngle = angle - rotate - 270;
                    console.log(totalAngle);
                    const realX = Math.sin(totalAngle * Math.PI / 180) * hypotenuse;
                    const realY = Math.cos(totalAngle * Math.PI / 180) * hypotenuse;

                    lastX = realX;
                    lastY = -realY;
                }
            }
        }
        ctx.drawImage(img, lastX, lastY);
    }
}

function enhance(ctx) {
    return new EnhancedCtx(ctx);
}
