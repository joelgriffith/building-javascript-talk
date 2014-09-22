var gulp = require('gulp');
var webpackConfig = require('./webpack.conf.js');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var helpers = require('./gulp.helpers');
var argv = require('yargs').argv;
var karma = require('gulp-karma');
var appPort = 1337;
var localtunnel = require('localtunnel');
var gutil = require('gulp-util');
var connect = require('gulp-connect');

// Default Task
gulp.task('default', ['js', 'css', 'img', 'html']);

// JS packaging for distribution/dev/test
gulp.task('js', function() {
	return gulp.src('src/js/index.js')
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('build/dev/js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/dist/js'))
		.pipe(connect.reload());
});

// Stylesheets
gulp.task('css', function() {
	return gulp.src('src/css/index.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 5 versions']
		}))
		.pipe(gulp.dest('build/dev/css'))
		.pipe(connect.reload())
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
		.pipe(connect.reload())
		.pipe(gulp.dest('build/dist/img'));
});

// Moving HTML over
gulp.task('html', function() {
	return gulp.src('src/*.html')
		.pipe(gulp.dest('build/dev'))
		.pipe(connect.reload())
		.pipe(gulp.dest('build/dist'));
});

// Karma Continuous Testing
// Pass your browsers by using --browser=chrome,firefox,ie9
// Run CI by passing --watch
gulp.task('test', function() {
	var defaultBrowsers = ['Chrome'];
	var browserArgs = helpers.parseBrowserArgs(argv).map(helpers.toCapitalCase);

	return gulp.src('lookAtKarmaConfJS')
		.pipe(karma({
			browsers: (browserArgs.length > 0) ? browserArgs : defaultBrowsers,
			configFile: 'karma.conf.js',
			action: (argv.watch) ? 'watch' : 'run'
		}));
});

// Opens up local apps to outside traffic, prints URL in CLI
gulp.task('tunnel', function(done) {

	localtunnel(appPort, function(err, tunnel) {
		if (err) throw new Error('Local tunnel fell over: ' + err);
		gutil.log(gutil.colors.green('App Tunnel at: ' + tunnel.url));
		done();
	});
});

// Watch Task with Live Reload
gulp.task('watch', ['default', 'tunnel'], function() {

	gulp.watch(['src/*.html'], ['html']);
	gulp.watch(['src/**/*.js'], ['js']);
	gulp.watch(['src/**/*.scss'], ['css']);
	gulp.watch(['src/**/*.png', 'src/**/*.jpg', 'src/**/*.gif'], ['img']);

	connect.server({
		port: appPort,
		root: 'build/dev',
		livereload: true
	});
});