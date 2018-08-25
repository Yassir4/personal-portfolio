const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

/*
  -- Top level functions --
  gulp.tast - Define tasks
  gulp.src - Point tofiles to use
  gulp.dest - Point to the folder to output
  gulp.watch - watch files and folders for changes
*/ 

// Logs messages
gulp.task('message', function(){
    return console.log('gulp is running...');
});

// Gulp task to copy HTML files to output directory
gulp.task('copyHtml',function(){
  gulp.src('src/*.html')
    .pipe(gulp.dest('public'))
});

// Optimize Images
gulp.task('imageMin', () =>
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'))
);

// Prefix CSS
// gulp.task('autoprefixer', () =>
//     gulp.src('src/css/*.css')
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(gulp.dest('public/css'))
// );

// clean Css + autoprifixer
gulp.task('minify-css', () => {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('public/css'));
});

gulp.task('default', ['message', 'copyHtml', 'imageMin','minify-css']);

// watch
gulp.task('watch', function(){
  gulp.watch('src/*.html',['copyHtml']);
  gulp.watch('src/img',['imageMin']);
  // gulp.watch('src/css/*.css',['autoprefixer']);
  gulp.watch('src/css/*.css',['minify-css']);
})