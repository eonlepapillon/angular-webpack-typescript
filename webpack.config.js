const webpack = require('webpack');
const sourceDir = __dirname + '/src';

module.exports = {
    context: sourceDir,
    entry: {
        app: './index.js',
        vendor: [
            'angular'
        ]
    },
    output: {
        path: sourceDir,
        filename: 'app.bundle.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {test: /\.tsx?$/, loader: 'ng-annotate!ts', exclude: /node_modules/},
            {test: /\.html/, loader: 'raw', exclude: /node_modules/}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.optimize.UglifyJsPlugin()
    ]
};