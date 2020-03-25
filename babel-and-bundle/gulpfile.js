const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');


const styleWatch = './src/scss/**/*.scss';
const jsWatch = './src/js/**/*.js';

const styleSrc = './src/scss/style.scss';
const styleDstDir = './dist/css/';
const jsSrc = 'script.js';
const jsDir = './src/js/';
const jsFiles = [jsSrc];
const jsDstDir = './dist/js/';






function taskStyle(d){
  gulp.src(styleSrc)
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .on('error', sass.logError)
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(styleDstDir))
  // sync to all browsers
  .pipe(browserSync.stream())
  ;

  d();
}





function taskJs(done){


  jsFiles.map(function(entry){

    // gulp.src(jsSrc)
    // .pipe(gulp.dest(jsDstDir));

    return browserify({
      entries: [jsDir + entry]
    }).transform(babelify, {
      presets: ['@babel/env']
    })
    .bundle()
    .pipe(source(entry))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsDstDir))
    ;

  });







  done();
};








function taskWatch(){


  browserSync.init({
    open: false,
    // injectChanges: true,
    server: {
      baseDir: "./"
    },
    /**
    Https setup
    ------------
    For https setup, don't forget to copy the /browser-sync/browser-sync-client.js code (video at 13:25)
    https://www.youtube.com/watch?v=NDjE_LCHbuI&list=PLriKzYyLb28lp0z-OMB5EYh0OHaKe91RV&index=8
    */
    //
    // proxy: 'https://jindemo',
    // https: {
    //   key: '/Users/alecadded/.valet/Certificates/gulp.dev.key',
    //   cert: '/Users/alecadded/.valet/Certificates/gulp.dev.crt'
    // }
  });

  gulp.watch(styleWatch, taskStyle).on('change', browserSync.reload);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch(jsWatch, taskJs).on('change', browserSync.reload);

};


exports.style = taskStyle;
exports.js = taskJs;
exports.default = gulp.parallel(taskStyle, taskJs);
exports.watch = taskWatch;
