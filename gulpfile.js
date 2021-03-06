var gulp = require('gulp');
var postcss = require('gulp-postcss');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var minimist = require('minimist');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var nano = require('gulp-cssnano');
var uglify = require('gulp-uglify');

var path = {
	CSS: ['./src/css/prism.css', './src/css/main.css'],
	IMAGES: './src/img/**/*.{png,jpg,gif,svg}',
	FONTS: './src/css/fonts/*.{eot,svg,ttf,woff,woff2}',
	JS: ['./src/js/prism.js', './src/js/app.js'],
	TO_COPY: ['src/*.{html,js,ico,xml,png,json}'],
	DEST_DIR: './www',
	EXPORT_DEST_DIR: '../neontribe-ghost/content/themes/hipster'
};

//
// Any files that simply need copying
//

gulp.task('copy', function () {
	gulp.src(path.TO_COPY)
		.pipe(gulp.dest(path.DEST_DIR));
	return gulp.src('src/js/modernizr.js')
		.pipe(gulp.dest(path.DEST_DIR + '/js'));
});

//
// CSS
//

gulp.task('css', function () {
	return gulp.src(path.CSS)
		.pipe(concat('main.css'))
		.pipe(postcss([
			precss(),
			autoprefixer({ remove: false, browser: ['> 1%', 'last 3 versions', 'Firefox ESR'] })
		]))
		.pipe(nano())
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
// Javascript
//

gulp.task('js', function () {
	return gulp.src(path.JS)
		.pipe(concat('bundle.js'))
		.pipe(uglify())
		.pipe(gulp.dest(path.DEST_DIR + '/js'));
});

//
// One-time build
//

gulp.task('build', ['copy', 'css', 'images', 'fonts', 'js']);

//
// Like build, but with file watching
//

gulp.task('default', ['copy', 'css', 'images', 'fonts', 'js'], function () {
	gulp.watch(path.TO_COPY, ['copy']);
	gulp.watch(path.CSS, ['css']);
	gulp.watch(path.IMAGES, ['images']);
	gulp.watch(path.FONTS, ['fonts']);
	gulp.watch(path.JS, ['js']);
});

//
// Export/copy production files to target directory
// e.g. gulp export --target ../neontribe-ghost/content/themes/hipster
//

gulp.task('export', /*['build'],*/ function () {
	var options = minimist(process.argv.slice(2));

	if (!options.target) {
		options.target = path.EXPORT_DEST_DIR;
		console.log('Using default target directory: ' + path.EXPORT_DEST_DIR);
	}

	gulp.src('./www/css/main.css').pipe(gulp.dest(options.target + '/assets/css'));

	gulp.src([
		'./www/img/**/*.{png,jpg,gif,svg}',
		'!./www/img/harry.jpg',
		'!./www/img/frank.jpg'
	]).pipe(gulp.dest(options.target + '/assets/img'));

	return gulp.src('./www/js/*.js').pipe(gulp.dest(options.target + '/assets/js'));
});

