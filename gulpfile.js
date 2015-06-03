 
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css'); 
var fs = require('fs');

gulp.task('ctrlsjs',function(){
	return gulp.src(['src/*/ctrl.js'])
		.pipe(sourcemaps.init())
  	    	.pipe(concat('ctrls.js'))
  	    .pipe(gulp.dest('build/'))
  	    	.pipe(rename("ctrls.min.js"))
  	    	.pipe(uglify())
  	    .pipe(sourcemaps.write())
		.pipe(gulp.dest('build/'));
});

gulp.task('ctrlstemplates',function(){
	return gulp.src(['src/pre.html','src/*/ctrl.html','src/post.html'])
  	    	.pipe(concat('ctrls.html'))
  	    .pipe(gulp.dest('build/'));
});

gulp.task('ctrlscss',function(){
	return gulp.src(['src/*/*.less'])
			.pipe(less())
			.pipe(rename("ctrls.css"))
  	    	.pipe(minifyCSS())
  	    .pipe(gulp.dest('build/'));
});

gulp.task('watch',['ctrlsjs','ctrlstemplates','ctrlscss'],function(){
	gulp.watch('src/*/*.*',['ctrlsjs','ctrlstemplates','ctrlscss']);
});

gulp.task('default', ['watch', 'ctrlsjs', 'ctrlstemplates','ctrlscss']);