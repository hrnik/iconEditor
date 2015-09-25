var gulp = require('gulp'),
  connect = require('gulp-connect');
 
gulp.task('connect', function() {
  connect.server({
     root: ['./'],
    livereload: true
  });
});
 
gulp.task('html', function () {
  gulp.src(['./src/*.html', './index.html'])
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./src/**/*.js')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('./src/**/*.css')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['./src/**/*.*','index.html'], ['html','js','css']);
});
 
gulp.task('default', ['connect', 'watch']);