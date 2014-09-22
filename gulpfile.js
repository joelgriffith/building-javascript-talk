var gulp = require('gulp');
var webpackConfig = require('./webpack.conf.js');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');

// JS packaging for distribution/dev/test
gulp.task('js', function() {
	return gulp.src('src/js/index.js')
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('build/dev/js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/dist/js'));
});