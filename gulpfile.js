var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');

var tsProject = ts.createProject({
    declaration: true,
    noExternalResolve: true
});
var tspath = 'tsjs/*.ts';
gulp.task('buildts', function () {
    var tsResult = gulp.src(tspath)
                    .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('js'));
});
gulp.task('watch', ['buildts'], function () {
    gulp.watch(tspath, ['buildts']);
});