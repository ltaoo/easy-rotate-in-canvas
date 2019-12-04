const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

const env = process.env.NODE_ENV;

function resolve(relativePath) {
    return path.join(__dirname, relativePath);
}

module.exports = {
    entry: resolve('./src/index.js'),
    output: {
        path: resolve('./build'),
        filename: `easy-rotate.${env === 'production' ? 'min.' : ''}js`,
        // 如果要打成 umd 包就把这两个注释取消
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: 'enhance',
        libraryExport: 'default',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env'],
                    ],
                },
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: true,
                cache: true,
                parallel: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    extractComments: 'all',
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
    },
    mode: env,
};
