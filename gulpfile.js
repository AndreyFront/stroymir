const gulp = require('gulp'),
    { src, dest, parallel, series, watch } = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    fileinclude = require('gulp-file-include'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    svgSprite = require('gulp-svg-sprite'),
    browserSync = require('browser-sync').create();

const pathSrc = {
    root: './dev/',
    images: './dev/assets/images/',
    icons: './dev/assets/icons/',
    fonts: './dev/assets/fonts/',
    styles: './dev/assets/styles/',
    scripts: './dev/assets/scripts/',
    pages: './dev/pages/',
    static: './dev/assets/static/',
}

const pathDist = {
    root: './dist/',
    images: './dist/assets/images/',
    icons: './dist/assets/icons/',
    fonts: './dist/assets/fonts/',
    styles: './dist/assets/styles/',
    scripts: './dist/assets/scripts/',
    pages: './dist/',
    static: './dist/assets/static/',
}

const isProd = false

gulp.task('scripts', () => {
    return src([`${pathSrc.scripts}main.js`], { sourcemaps: true })
        .pipe(gulpif(isProd, uglify().on('error', notify.onError())))
        .pipe(dest(`${pathDist.scripts}`, { sourcemaps: true }))
        .pipe(browserSync.stream());
})

gulp.task('scripts-libs', () => {
    return src([`${pathSrc.scripts}libs/*.js`], { sourcemaps: true })
        .pipe(concat('libs.js'))
        .pipe(gulpif(isProd, uglify().on('error', notify.onError())))
        .pipe(dest(`${pathDist.scripts}`, { sourcemaps: true }))
        .pipe(browserSync.stream());
})

gulp.task('full-inclusions', () => {
    return src([
        `${pathSrc.pages}*.html`, 
        `${pathSrc.pages}**/*.html`, 
        `${pathSrc.pages}**/**/*.html`
    ]).pipe(
        fileinclude({
            prefix: '@',
            basepath: '@file',
        })
    )
    .pipe(gulpif(isProd, htmlmin({ collapseWhitespace: true })))
    .pipe(browserSync.stream());
})

gulp.task('master-inclusions', () => {
    return src([`${pathSrc.pages}*.html`]) // , `${pathSrc.pages}**/*.html`
        .pipe(
            fileinclude({
                prefix: '@',
                basepath: '@file',
            })
        )
        .pipe(gulpif(isProd, htmlmin({ collapseWhitespace: true })))
        .pipe(rename({dirname: ''}))
        .pipe(dest(`${pathDist.pages}`))
        .pipe(browserSync.stream());
})

gulp.task('styles', () => {
    return src(`${pathSrc.styles}main.scss`, { sourcemaps: true })
        .pipe(sass().on('error', notify.onError()))
        .pipe(
            autoprefixer({
                grid: true,
                overrideBrowserslist: ['last 5 versions'],
                cascade: false,
            })
        )
        .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
        .pipe(dest(`${pathDist.styles}`, { sourcemaps: true }))
        .pipe(browserSync.stream());
})

gulp.task('static', () => {
    return src(`${pathSrc.static}**/*`)
        .pipe(dest(`${pathDist.static}`))
        .pipe(browserSync.stream());
})

gulp.task('fonts', () => {
    return src([`${pathSrc.fonts}**/*`])
        .pipe(dest(`${pathDist.fonts}`))
})

gulp.task('images', () => {
    return src([
        `${pathSrc.images}**/*.svg`,
        `${pathSrc.images}**/*.jpg`,
        `${pathSrc.images}**/*.png`,
        `${pathSrc.images}**/*.jpeg`,
        `${pathSrc.images}**/*.gif`
      ])
        .pipe(gulpif(isProd, imagemin({ verbose: true })))
        .pipe(dest(`${pathDist.images}`))
        .pipe(browserSync.stream());
})

gulp.task('sprite-svg', () => {
    return src(`${pathSrc.icons}*.svg`,)
        .pipe(imagemin({ verbose: true }))
        .pipe(svgSprite(
            {
                mode: {
                    stack: {
                        sprite: '../sprite-svg.svg',
                    },
                },
            }
        ))
        .pipe(dest(`${pathDist.icons}`))
        .pipe(browserSync.stream());
})

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: `${pathDist.pages}`,
        },
    })

    watch(`${pathSrc.scripts}**/*.js`, series('scripts'))
    watch(`${pathSrc.pages}**/**/*.html`, series(['full-inclusions', 'master-inclusions']))
    watch(`${pathSrc.styles}**/**/*.scss`, parallel('styles'))
    watch(`${pathSrc.images}**/*.{jpg,jpeg,png,svg}`, series('images'))
    watch(`${pathSrc.icons}*.svg`, series('sprite-svg'))
    watch(`${pathSrc.static}`, series('static'))
})

gulp.task('clean', () => {
    return del(`${pathDist.root}`)
})

const defaultTasks = [
    'clean', 
    'scripts',
    'scripts-libs',
    'styles',
    'sprite-svg',
    'full-inclusions',
    'master-inclusions',
    'images',
    'static',
    'fonts',
    'browser-sync'
]

exports.default = series(defaultTasks)
