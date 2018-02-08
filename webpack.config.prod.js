const path = require('path');
const webpack = require('webpack');

const banner = `/*
 * Copyright 2015-2018 Gorillabyte and Silverback Project Authors 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */`;

module.exports = {
    entry: path.join(__dirname, './src/index.ts'),
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'silverback.js',
        publicPath: './dist/',
        library: 'Silverback',
        libraryTarget: 'var'
    },
    node: {
        fs: 'empty'
    },
    module: {
        loaders: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            loader: 'babel-loader!ts-loader'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['node_modules', 'src']
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            beautify: false,
            mangle: {
              screw_ie8: true,
              keep_fnames: true,
            },
            compress: {
              screw_ie8: true,
            },
            comments: false,
        }),
        new webpack.BannerPlugin({
            banner: banner,
            raw: true,
            entryOnly: true
        }),
    ]
};
