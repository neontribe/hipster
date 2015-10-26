var gulp = require('gulp');
var postcss = require('gulp-postcss');
var imagemin = require('gulp-imagemin');

var path = {
	CSS: './src/css/**/*.css',
	IMAGES: './src/img/**/*.{png,jpg,gif,svg}',
	FONTS: './src/css/fonts/*.{eot,svg,ttf,woff,woff2}',
	TO_COPY: ['src/*.{html,js,ico,xml,png,json}'],
	DEST_DIR: './www'
};

//
// Any files that simply need copying
//

gulp.task('copy', function () {
	gulp.src(path.TO_COPY)
		.pipe(gulp.dest(path.DEST_DIR));
});

//
// CSS
//

gulp.task('css', function () {
	return gulp.src(path.CSS)
		.pipe(postcss([
			require('precss')(),
			require('autoprefixer')()
		]))
		.pipe(gulp.dest(path.DEST_DIR + '/css'));
});

//
// Images
//

gulp.task('images', function () {
	return gulp.src(path.IMAGES)
		.pipe(imagemin())
		.pipe(gulp.dest(path.DEST_DIR + '/img'));
});

//
// Fonts
//

gulp.task('fonts', function () {
	return gulp.src(path.FONTS)
		.pipe(gulp.dest(path.DEST_DIR + '/fonts'));
});

//
// One-time build
//

gulp.task('build', ['copy', 'css', 'images', 'fonts']);

//
// Like build, but with file watching
//

gulp.task('default', ['copy', 'css', 'images', 'fonts'], function () {
	gulp.watch(path.TO_COPY, ['copy']);
	gulp.watch(path.CSS, ['css']);
	gulp.watch(path.IMAGES, ['images']);
	gulp.watch(path.FONTS, ['fonts']);
});
