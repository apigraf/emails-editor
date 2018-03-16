const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-source-map',

    module: {
        rules: [
            {
                test: /\.(ts)$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },

    devServer: {
        port: 3000
    }
});
