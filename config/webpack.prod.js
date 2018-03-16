const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const path = require('path');

const commonConfig = require('./webpack.common');

const sourcePath = path.join(__dirname, '../app');
const aotGeneratedPath = path.join(__dirname, '../aot');

module.exports = webpackMerge(commonConfig, {
    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                include: [sourcePath, aotGeneratedPath],
                use: ['@ngtools/webpack']
            }
        ]
    },

    plugins: [
        new webpack.NormalModuleReplacementPlugin(/\.\/environment\.dev/, './environment.prod'),

        new CleanWebpackPlugin(['dist'], {
            root: process.cwd()
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                sequences: true,
                dead_code: true,
                warnings: false,
                unsafe: true
            },
            output: {
                comments: false
            },
            sourceMap: true
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new AngularCompilerPlugin({
            tsConfigPath: 'tsconfig.json',
            entryModule: sourcePath + '/app.module#AppModule',
            typeChecking: false
        })
    ]
});
