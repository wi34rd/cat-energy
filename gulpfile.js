const fs = require('fs');
const path = require('path');

const browserSync = require('browser-sync');
const del = require('del');
const nunjucks = require('nunjucks');

const gulp = require('gulp');
const data = require('gulp-data');
const gulpNunjucks = require('gulp-nunjucks');
// const rename = require('gulp-rename');
const sass = require('gulp-sass');


gulp.task('clean', () => {
    return del('build/')
});

gulp.task('html', () => {
    return gulp.src('src/html/pages/**/*.html')
        .pipe(data((file) => Object.assign(
            JSON.parse(fs.readFileSync('src/html/site.json')),
            JSON.parse(fs.readFileSync(path.join(path.dirname(file.path), path.basename(file.path, '.html') + '.json')))
        )))
        .pipe(gulpNunjucks.compile(undefined, {
            env: new nunjucks.Environment(new nunjucks.FileSystemLoader(['src/html/base/', 'src/html/blocks/']))
        }))
        .pipe(gulp.dest((file) => {
            file.path = path.join(file.base, path.basename(file.path));

            return 'build/';
        }));
});

gulp.task('css', () => {
    return gulp.src('src/sass/styles.sass')
        .pipe(sass())
        .pipe(gulp.dest('build/css/'))
        .pipe(browserSync.stream());
});

gulp.task('js', () => {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('build/js/'));
});

gulp.task('other', () => {
    return gulp.src([
            'src/fonts/*.{svg,ttf,woff,woff2}',
            'src/images/**/*.{svg,jpg,jpeg,png}',
            '!src/images/inline/*',
            '!src/images/inline',
            '!src/images/sprites/*',
            '!src/images/sprites',
        ], {
            base: 'src/'
        })
        .pipe(gulp.dest('build/'));
});

gulp.task('reload', done => {
    browserSync.reload();
    done();
});

gulp.task('build', gulp.series('clean', 'other', 'js', 'css', 'html'));

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: 'build/'
        },
        browser: '%LOCALAPPDATA%/Google/Chrome SxS/Application/chrome.exe'
    });

    // gulp.watch('src/images/sprites/*.svg', gulp.series('svgstore'));

    gulp.watch(
        ['src/html/**', 'src/images/inline/*'],
        gulp.series('html', 'reload')
    );

    gulp.watch('src/sass/**/*.{scss,sass}', gulp.series('css')); // TODO: Добавить задачу "csso"

    gulp.watch('src/js/**/*.js', gulp.series('js', 'reload'));

    gulp.watch(
        [
            'src/fonts/**/*.{svg,ttf,woff,woff2}',
            'src/images/**/*.{svg,jpg,jpeg,png}'
        ],
        gulp.series('other', 'reload')
    );

    // gulp.watch(
    //     ['src/images/**/*.svg', '!src/images/inline/*', '!src/images/sprites/*'],
    //     gulp.series('svgo', 'reload')
    // );
});
