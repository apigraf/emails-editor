const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const sourcePath = path.join(__dirname, '../app');
const npmVendorPath = path.join(__dirname, '../node_modules');
const distPath = path.join(__dirname, '../dist');

module.exports = {
    context: sourcePath,

    entry: [
        'index.ts',
        'main.scss'
    ],

    output: {
        path: distPath,
        filename: 'bundle.[chunkhash].js',
    },

    resolve: {
        extensions: ['.js', '.ts'],
        modules: [
            npmVendorPath,
            sourcePath
        ]
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),

        new ExtractTextPlugin({
            filename: 'main.[chunkhash].css',
            disable: false,
            allChunks: true
        }),

        // fixes WARNING Critical dependency: the request of a dependency is an expression
        new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, path.join(__dirname, '../app')),
    ]
};
