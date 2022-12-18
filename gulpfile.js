import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import csso from 'gulp-csso';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';
import ts from 'gulp-typescript';

const { src, dest, series, parallel, watch } = gulp;

const tsProject = ts.createProject('tsconfig.json');
const sass = gulpSass(dartSass);
const sync = browserSync.create();

function scss() {
    return src('./src/scss/styles.scss')
        .pipe(sass())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['>1%'],
            }),
        )
        .pipe(csso())
        .pipe(dest('./dist/css'));
}

function html() {
    return src('./src/**/*.html')
        .pipe(dest('dist/'));
}

function script() {
    return src('./src/**/*.js')
        .pipe(dest('dist/'));
}

function typescript() {
    return src('./src/**/*.ts')
        .pipe(tsProject())
        .pipe(dest('dist/'));
}

function clear() {
    return deleteAsync('dist/**');
}

function serve() {
    watch('./src/**/**.html', series(html)).on('change', sync.reload);
    watch('./src/scss/**.scss', series(scss)).on('change', sync.reload);
    watch('./src/**/**.js', series(script)).on('change', sync.reload);
    watch('./src/**/**.ts', series(typescript)).on('change', sync.reload);
}

async function startBrowserSync() {
    sync.init({
        server: './dist',
        open: false,
    });
}

export const watchNode = parallel(
    startBrowserSync,
    series(
        clear, 
        html,  
        scss,
        script,
        typescript,
        serve
    )
)