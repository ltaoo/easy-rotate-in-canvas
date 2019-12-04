const path = require('path');

const env = process.env.NODE_ENV;

function resolve(relativePath) {
    return path.join(__dirname, relativePath);
}

module.exports = {
    entry: resolve('./src/index.js'),
    output: {
        path: resolve('./build'),
        filename: 'easy-rotate.js',
        // 如果要打成 umd 包就把这两个注释取消
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: 'enhance',
        libraryExport: 'default',
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env'],
                ],
            },
        }, ],
    },
    mode: env,
};
