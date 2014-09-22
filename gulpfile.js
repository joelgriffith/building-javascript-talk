var gulp = require('gulp');
var webpackConfig = require('./webpack.conf.js');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');

// JS packaging for distribution/dev/test
gulp.task('js', function() {
	return gulp.src('src/js/index.js')
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('build/dev/js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/dist/js'));
});

// Stylesheets
gulp.task('css', function() {
	return gulp.src('src/css/index.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 5 versions']
		}))
		.pipe(gulp.dest('build/dev/css'))
		.pipe(minifycss())
		.pipe(gulp.dest('build/dist/css'));
});