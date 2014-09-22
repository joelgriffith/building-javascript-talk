var gulp = require('gulp');
var webpackConfig = require('./webpack.conf.js');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');

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

// Image minification
gulp.task('img', function() {
	return gulp.src(['src/img/*.png', 'src/img/*.jpg', 'src/img/*.gif'])
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('build/dev/img'))
		.pipe(gulp.dest('build/dist/img'));
});