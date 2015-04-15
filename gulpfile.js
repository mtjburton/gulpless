var gulp = require('gulp');
var	plumber = require('gulp-plumber');
var	livereload = require('gulp-livereload');
var onError = require('gulp-notify').onError("Error: <%= error.message %>"); 

gulp.task('default', ['build', 'watch', 'connect']);
gulp.task('build', ['build-css', 'build-js', 
		'build-templates', 'copy-static', 'opt-image']);
gulp.task('rebuild', ['clean', 'build']);

gulp.task('watch', ['build'], function(){
	gulp.watch('src/templates/**/*.twig', ['build-templates']);
	gulp.watch('src/css/*.less', ['build-css']);
	gulp.watch('src/js/*.js', ['build-js']);
});

gulp.task('clean', function() {
	var clean = require('gulp-clean');

	return gulp.src('dist/')
		.pipe(clean());
});

gulp.task('build-templates', function() {
	var twig = require('gulp-twig');

	return gulp.src('src/templates/pages/*.twig')
		.pipe(twig({'base': process.cwd() + '/src/templates'}))
		.pipe(gulp.dest('dist/public'))
		.pipe(livereload());
});

gulp.task('copy-static', function() {
	return gulp.src('/src/static/*')
		.pipe(gulp.dest('dist/public'));
});

gulp.task('build-css', function() {
	var less = require('gulp-less');
	var mincss = require('gulp-minify-css');
	var rename = require('gulp-rename');
	var es = require('event-stream');

	var stream1 = gulp.src('src/css/vendor/*/*.css')
		.pipe(gulp.dest('dist/public/css/'));

	var stream2 = gulp.src('src/css/hbp.less')
		.pipe(plumber({
			errorHandler: onError 
		}))
		.pipe(less())
		.pipe(plumber.stop())
		.pipe(rename('style.min.css'))
		.pipe(mincss())
		.pipe(gulp.dest('dist/public/css/'))
		.pipe(livereload());

	return es.merge(stream1, stream2);
});

gulp.task('build-js', function() {
	var uglify = require('gulp-uglify');
	var concat = require('gulp-concat');
	var jshint = require('gulp-jshint');
	var es = require('event-stream');

	var stream1 = gulp.src(['src/js/vendor/**/*.js', 'src/js/vendor/**/*.map'])
		.pipe(gulp.dest('dist/public/js'));

	var stream2 = gulp.src('src/js/*.js')
		.pipe(plumber({
			errorHandler: onError 
		}))
		.pipe(jshint())
		.pipe(plumber.stop())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('dist/public/js'))
		.pipe(livereload());

	return es.merge(stream1, stream2);
});

gulp.task('opt-image', function() {
	var imagemin = require('gulp-imagemin');

	return gulp.src('src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/public/img'));
});

gulp.task('connect', ['build'], function() {
	var connect = require('gulp-connect-php');

	livereload.listen();
	connect.server({
		'host': 'localhost',
		'port': '8000',
		'base': 'dist/public'
	});
});
