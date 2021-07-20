'use strict';

const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const sourcemap = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const svgSprite = require('gulp-svg-sprite');

const scriptsArray = [
  'src/scripts/jquery-3.6.0.min.js', // библиотека jquery
  'src/scripts/jquery-migrate-3.3.2.min.js', // для совместимости версий jquery
  'src/scripts/jquery.fancybox.min.js', // модальные окна
  'src/scripts/slick.min.js', // слайдер
  'src/scripts/swiper.min.js', // слайдер #2
  'src/scripts/pagescroll2id.min.js', // скролл к якорю
  'src/scripts/jquery.maskedinput.min.js', // маска ввода
  'src/scripts/jquery.validate.min.js', // валидация формы
  'src/scripts/scripts.js' // скрипты
];

function fClean() {
  return del('build/**/*');
}

function fFontsCopy() {
  return src('src/fonts/*.{woff,woff2}')
    .pipe(dest('build/fonts/'))
    .pipe(browserSync.stream());
}

function fResourcesCopy() {
  return src('src/resources/**')
    .pipe(dest('build'));
}

function fPug() {
  return src('src/pug/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('build'))
    .pipe(browserSync.stream());
}

function fImagesCopy() {
  return src('src/images/**/*.{png,jpg,jpeg}')
    .pipe(dest('build/images/'));
}

function fSVGSprites() {
  return src('src/images/icon-*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(dest('build/images/'));
}

function fStyles() {
  return src('src/scss/main.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: [
        'last 4 versions',
        'not dead',
        'not ie <= 11'
      ],
      grid: true
    }))
    .pipe(sourcemap.write('.'))
    .pipe(dest('build/styles/'))
    .pipe(browserSync.stream());
}

function fScripts() {
  return src(scriptsArray)
    .pipe(plumber())
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(dest('build/scripts/'))
    .pipe(browserSync.stream());
}

function fBrowserSync() {
  browserSync.init({
    server: { baseDir: 'build/' },
    notify: false,
    online: true,
    cors: true
  })
}

function fStartWatch() {
  watch('src/scss/**/*.scss', fStyles);
  watch('src/scripts/*.js', fScripts);
  watch('src/pug/**/*.pug', fPug);
  watch('src/images/**/*.{png,jpg,jpeg}', fImagesCopy);
  watch('src/fonts/**/*.{woff,woff2}', fFontsCopy);
  watch('src/images/icon-*.svg', fSVGSprites);
}

exports.browsersync = fBrowserSync;
exports.scripts = fScripts;
exports.scriptsbuild = fScriptsBuild;
exports.styles = fStyles;
exports.stylesbuild = fStylesBuild;
exports.images = fImagesCopy;
exports.imagesbuild = fImagesBuild;
exports.clean = fClean;
exports.html = fPug;
exports.fontscopy = fFontsCopy;
exports.resourcescopy = fResourcesCopy;

exports.default = series(fClean, parallel(fPug, fScripts, fFontsCopy, fImagesCopy, fSVGSprites, fResourcesCopy), fStyles, parallel(fBrowserSync, fStartWatch));

function fStylesBuild() {
  return src('src/scss/main.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: [
        'last 4 versions',
        'not dead',
        'not ie <= 11'
      ],
      grid: true
    }))
    .pipe(dest('build/styles/'));
}

function fScriptsBuild() {
  return src(scriptsArray)
    .pipe(plumber())
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(dest('build/scripts/'));
}

function fImagesBuild() {
  return src('src/images/**/*.{png,jpg,jpeg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(dest('build/images/'));
}

exports.build = series(fClean, fPug, fScriptsBuild, fFontsCopy, fImagesBuild, fSVGSprites, fResourcesCopy, fStylesBuild);
