var prod = false;

var gulp = require('gulp'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	reload = require('browser-sync').reload;

var path = {
	dist: {
		html: 'dist/',
		js: 'dist/js/',
		css: 'dist/css/',
		img: 'dist/img/',
		fonts: 'dist/fonts/'
	},
	src: {
		html: ['src/**/*.jade'],
		js: 'src/js/*.js',
		style: 'src/sass/*.*',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch: {
		html: 'src/**/*.jade',
		js: 'src/js/**/*.js',
		style: 'src/sass/**/*.sass',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './dist'
};

var serverConfig = {
	server: {
		baseDir: "./dist"
	},
	tunnel: false,
	host: 'localhost',
	port: 63341,
	logPrefix: "browser-sync"
};

// SASS
gulp.task('sass', function () {
	var outputStyle = prod ? 'compressed' : 'expanded';
	var isSoursemap = prod ? false : true;
	gulp.src(path.src.style)
		.pipe(sourcemaps.init())
		.pipe(sass({
			soursemap: isSoursemap,
			outputStyle: outputStyle
		}).on('error', sass.logError))
		.pipe(autoprefixer({browsers:['last 4 versions']}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.dist.css))
		.pipe(reload({stream:true}));
});

// JADE
gulp.task('jade', function(){
	var pretty = prod ? false : true;
	gulp.src(path.src.html)
		.pipe(jade({
			pretty: pretty
		}))
		.pipe(gulp.dest(path.dist.html))
		.pipe(reload({stream:true}));
});

// SCRIPTS
gulp.task('scripts', function(){
	// var uglify = prod ? uglify() : function () {};
	gulp.src(path.src.js)
		// .pipe(uglify())
		.pipe(gulp.dest(path.dist.js))
		.pipe(reload({stream:true}));
});

// IMAGES
gulp.task('images', function(){
	gulp.src(path.src.img)
		.pipe(gulp.dest(path.dist.img));
});

// FONTS
gulp.task('fonts', function(){
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.dist.fonts));
});

// SERVER
gulp.task('browser-sync', function() {
	browserSync.init(serverConfig);
});

// WATCH
gulp.task('watch', function(){
	gulp.watch(path.watch.html, ['jade']);
	gulp.watch(path.watch.style, ['sass']);
	gulp.watch(path.watch.js, ['scripts']);
	gulp.watch(path.watch.img, ['images']);
});

// DEFAULT
gulp.task('default', ['sass', 'jade', 'scripts', 'images', 'fonts', 'browser-sync', 'watch']);
