var gulp = require('gulp'),
    nunjucksRender = require('gulp-nunjucks-render'),
    //data = require('gulp-data'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    del = require('del'),
    wiredep = require('wiredep'),
    path = require('path'),
    useref = require('gulp-useref'),
    data = require('gulp-data');

gulp.task('nunjucks', function() {
    return gulp.src('app/pages/**/*.+(html|nunjucks)')
        .pipe(data(function() {
          return require('./app/data.json')
        }))
        .pipe(nunjucksRender({
            path: ['app/templates']
        }))
        .pipe(gulp.dest('.tmp'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('sass', function() {
    return gulp.src('app/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('scripts', () => {
    return gulp.src('app/scripts/**/*.js')
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('useref', ['nunjucks', 'scripts', 'sass'], function() {
    return gulp.src('.tmp/**/*.html')
    .pipe(useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe(gulp.dest('dist'))
})

gulp.task('browserSync', function() {
    browserSync({
        notify: false,
        server: {
            baseDir: 'dist'
        },
        port: 8080
    })
})

gulp.task('images', function(){
    return gulp.src('app/images/*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream: true
        }));
})

gulp.task('fonts', () => {
    return gulp.src(['bower_components/**/*.{eot,svg,ttf,woff,woff2}','app/fonts/**/*'])
        .pipe(gulp.dest('.tmp/fonts'))
        .pipe(gulp.dest(function(file) {
            file.path = path.join(file.base, path.basename(file.path));
            return 'dist/fonts';
        }))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('dist/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('dist'));
});


gulp.task('build', ['useref', 'images', 'fonts', 'extras'], function() {
    
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('watch', ['build', 'browserSync'], function() {
  gulp.watch('app/images/*', ['images']);
  gulp.watch('app/styles/*.scss', ['useref']);
  gulp.watch('app/scripts/*.js', ['useref']);
  gulp.watch('app/+(pages|templates)/**/*.+(html|nunjucks)', ['useref']);
  //gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('default', ['clean'], () => {
  gulp.start('watch');
});