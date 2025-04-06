'use strict'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/js/main.js',
        portfolio: './src/js/portfolio.js'
    },
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: {
                        list: [{
                            tag: 'img',
                            attribute: 'src',
                            type: 'src',
                            filter: (tag, attribute, attributes, resourcePath) => {
                                // Process only images in your media folder
                                return attributes.src.startsWith('@media/')
                            }
                        }]
                    }
                }
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css', // CSS files go to static/css/
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'src/media',
                to: 'images',
                globOptions: {
                    ignore: ['**/.DS_Store'], // ignore these files
                },
            }]
        })
    ],
    resolve: {
        alias: {
            '@media': path.resolve(__dirname, 'src/media/')
        }
    }
}