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
            if (angle === rotate) {
                lastX = hypotenuse;
                lastY = 0;
            } else if (angle > rotate) {
                const totalAngle = angle - rotate;
                const realX = Math.cos(totalAngle * Math.PI / 180) * hypotenuse;
                const realY = Math.sin(totalAngle * Math.PI / 180) * hypotenuse;

                console.log(realX, realY);
                lastX = realX;
                lastY = realY;
            } else {
                const totalAngle = angle + rotate;
                const realX = Math.sin(totalAngle * Math.PI / 180) * hypotenuse;
                const realY = Math.cos(totalAngle * Math.PI / 180) * hypotenuse;

                console.log(realX, realY);
                lastX = realX;
                lastY = -realY;
            }

        }
        ctx.drawImage(img, lastX, lastY);
    }
}

function enhance(ctx) {
    return new EnhancedCtx(ctx);
}
