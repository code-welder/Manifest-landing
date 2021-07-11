const {src, dest, series, watch, parallel, lastRun} = require('gulp')

const del = require('del'),
      include = require('gulp-file-include'),
      htmlmin = require('gulp-htmlmin'),
      gulpIf = require('gulp-if'),
      server = require('browser-sync').create(),
      autoprefixer = require('gulp-autoprefixer'),
      sass = require('gulp-sass'),
      gcmq = require('gulp-group-css-media-queries'),
      purgecss = require('gulp-purgecss'),
      sourcemap = require('gulp-sourcemaps'),
      csso = require('gulp-csso'),
      babel = require('gulp-babel'),
      concat = require('gulp-concat'),
      combine = require('stream-combiner2').obj,
      imagemin = require('gulp-imagemin'),
      rev = require('gulp-rev'),
      revReplace = require('gulp-rev-replace'),
      svgSprite = require('gulp-svg-sprite'),
      ghPages = require('gulp-gh-pages'),
      ttf2woff = require('gulp-ttf2woff'),
      uglify = require('gulp-uglify');


let isProd = process.argv.includes('--prod')

function html() {
  return src(['./src/*.html', '!./src/_*.html'])
    .pipe(include())
    .pipe(gulpIf(isProd, combine(
      revReplace({
        manifest: src(['css.json', 'js.json'], {cwd: 'manifest/', allowEmpty: true})
      }),
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )))
    .pipe(dest('dist'))
}

function style() {
  return src('./src/scss/style.scss')
    .pipe(gulpIf(!isProd, sourcemap.init()))
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .pipe(gulpIf(isProd, combine(
      gcmq(),
      autoprefixer(),
      csso()
    )))
    .pipe(gulpIf(!isProd, sourcemap.write('.')))
    .pipe(gulpIf(isProd, rev()))
    .pipe(dest('./dist/css'))
    .pipe(gulpIf(isProd, combine(rev.manifest('css.json'), dest('./manifest'))))
}

function scripts() {
  return src('./src/js/**/*.js')
    .pipe(combine(
      concat('main.js', {newLine: ';'}),
      babel({
        presets: ['@babel/preset-env']
      }),
      gulpIf(isProd, uglify()),
      gulpIf(isProd, rev())
    ))
    .pipe(dest('./dist/js'))
    .pipe(gulpIf(isProd, combine(rev.manifest('js.json'), dest('./manifest'))))
}

function img() {
  return src('./src/assets/img/**/*.{jpeg,jpg,png,svg,gif}', {since: lastRun(img)})
    .pipe(imagemin([
      imagemin.mozjpeg({
        quality: 75, progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false},
        ],
      })
    ]))
    .pipe(dest('./dist/assets/img'))
}

function serve() {
  server.init({
    server: './dist',
    notify: false,
  })

  watcher('./src/**/*.html', html)
  watcher('./src/scss/**/*.scss', style)
  watcher('./src/js/**/*.js', scripts)
  watcher('./src/assets/img/**/*.{jpeg,jpg,png,svg,gif}', img)

  function watcher(path, seriesName) {
    watch(path, series(seriesName)).on('change', server.reload)
  }
}

function clean() {
  return del(['./dist', './manifest'])
}

function getSvgSprite() {
  return src('./src/assets/svg-for-sprite/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
            sprite: "../sprite.svg"
        }
      },
    }))
    .pipe(dest('./src/assets/img'))
}

function fonts() {
  src('./src/assets/fonts/*.woff')
    .pipe(dest('./dist/assets/fonts/'));

  return src('./src/assets/fonts/*.ttf')
    .pipe(ttf2woff())
    .pipe(dest('./dist/assets/fonts/'))
}

function deploy() {
  return src('./dist/**/*')
    .pipe(ghPages())
}

exports.build = series(clean, parallel(style, scripts, img, getSvgSprite, fonts), html)
exports.serve = serve
exports.svg = getSvgSprite
exports.fonts = fonts
exports.deploy = deploy