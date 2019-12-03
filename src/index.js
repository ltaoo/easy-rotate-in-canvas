class EnhancedCtx {
    constructor(ctx) {
        this.originalCtx = ctx;
    }
    drawImage(img, options) {
        const ctx = this.originalCtx;
        const { x, y } = options;
        ctx.drawImage(img, x, y);
    }
}

function enhance(ctx) {
    return new EnhancedCtx(ctx);
}
