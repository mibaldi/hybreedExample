'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('setDebugTrue', function() {
    global.isDebug = true;
});

gulp.task('develop', function(callback) {
    runSequence('jsonServer','setDebugTrue', 'build', 'browserSync', callback);
});
