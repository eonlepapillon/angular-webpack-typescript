const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let config = {
    context: `${__dirname}/src`,
    entry: {
        app: './index.js',
        vendor: [
            'angular',
            'redux'
        ]
    },
    devtool: '#source-map',
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].bundle.js'
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
        new CleanWebpackPlugin(['dist'], {
            verbose: true,
            dry: false
        })
    ]
};

let htmlWebpackPluginConfig = {
    template: './index.html'
};

if (process.env.NODE_ENV === 'production') {
    console.log('[webpack config] PRODUCTION');

    htmlWebpackPluginConfig.minify = {
        html5: true,
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
    };

    config.output.filename = '[name].bundle.[chunkhash].js';
    config.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }));

    config.plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', '[name].bundle.[chunkhash].js'));
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    config.plugins.push(new HtmlWebpackPlugin(htmlWebpackPluginConfig));

} else {
    console.log('[webpack config] environment DEVELOPMENT');

    config.plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', '[name].bundle.js'));
    config.plugins.push(new HtmlWebpackPlugin(htmlWebpackPluginConfig));

}

module.exports = config;