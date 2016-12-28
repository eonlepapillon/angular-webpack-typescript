const gulp = require('gulp');
const gutil = require('gulp-util');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');

gulp.task('ts:compile', function () {
    let tsProject = ts.createProject('tsconfig.json');

    return gulp.src('src/ts/**/*.ts')
        .pipe(tslint({
            formatter: 'verbose'
        }))
        .pipe(tslint.report())
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/js'))
});

gulp.task('webpack', function (done) {
    webpack(webpackConfig, function (error, stats) {
        if (error) {
            throw new gutil.PluginError('webpack', error);
        }

        gutil.log('[webpack]', stats.toString({
            colors: true
        }));

        done();
    })
});

gulp.task('webpack-dev-server', function (/*callback*/) {
    // Start a webpack-dev-server
    let config = Object.create(webpackConfig);
    config.devtool = 'eval';
    config.debug = true;

    new WebpackDevServer(webpack(config), {
        publicPath: `/src`,
        stats: {
            colors: true
        }
    }).listen(8080, 'localhost', function (error) {
        if (error) {
            throw new gutil.PluginError('webpack-dev-server', error);
        }

        // Server listening
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');

        // keep the server alive or continue?
        // callback();
    });
});
