const gulp = require('gulp');
const header = require('gulp-header');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sync = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');

const jsmin = require('gulp-jsmin');
const { dest } = require('gulp');


//Pug files to HTML
const pughere = () => {
    return gulp.src('src/includes/*')
        .pipe(pug())
        .pipe(gulp.dest('src/html'))
}

//HTML
const html = () => {
    return gulp.src('src/program.pug')
        .pipe(pug())
        .pipe(rename('index.html'))
        .pipe(gulp.dest('src'))
        .pipe(sync.stream());
}

// Styles
const styles = () => {
    return gulp.src('src/stylesheets/style.sass')
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('src'))
        .pipe(sync.stream());
}

const scriptsMin = () => {
    return gulp.src('src/*.js')
        .pipe(jsmin())
        .pipe(gulp.dest('src'))
        .pipe(sync.stream());
}

// Server
const server = (done) => {
    sync.init({
        server: {
            baseDir: 'src'
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
}

exports.pughere = pughere;
exports.html = html;
exports.styles = styles;
exports.scriptsMin = scriptsMin;
exports.server = server;

// Watcher
const watcher = () => {
    gulp.watch('src/stylesheets/**/*.sass').on('change', gulp.series('styles'));
    gulp.watch('src/*.css').on('change', sync.reload);
    gulp.watch('src/**/*.pug').on('change', gulp.series('html'));
    gulp.watch('src/*.js').on('change', sync.reload);
}

exports.default = gulp.series(
    html, styles, server, watcher
);