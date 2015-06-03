 
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var replacer = require("./replacer");
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css'); 
var del = require('del');
var fs = require('fs');
var Q = require('q');

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
		.pipe(gulp.dest('dist/'))
			.pipe(rename("ctrls.css"))
  	    	.pipe(minifyCSS())
  	    .pipe(gulp.dest('dist/'));
});

gulp.task('appinclude',['appjs','apptemplates','apptemplatecss'],function(e){
	function write(){ 
		var base = '<script type="text/javascript" src="/js/pre.js"></script>\n'+
		'<script type="text/javascript" src="/js/vendors/AngularJS/angular.min.js"></script>\n'+
		'<script type="text/javascript" src="/js/vendors/AngularJS/angular-animate.min.js"></script>\n'+
		'<script type="text/javascript" src="/js/vendors/AngularJS/angular-resource.min.js"></script>\n';
		
		var includeStr = '<link rel="stylesheet" type="text/css" href="/app.templates.css" />\n';
		var includeMinStr = '<link rel="stylesheet" type="text/css" href="/app.templates.min.css" />\n';
	
		var templates = fs.readFileSync('dist/app.templates.html','utf8');
		includeStr += templates+'\n';
		includeMinStr += templates+'\n';
		
		includeStr += base+'<script type="text/javascript" src="/app.js"></script>\n';
		includeMinStr += base+'<script type="text/javascript" src="/app.min.js"></script>\n';
		
		includeStr += '<script type="text/javascript" src="/js/post.js"></script>';
		includeMinStr += '<script type="text/javascript" src="/js/post.js"></script>';
		
		fs.writeFileSync('dist/app.include.html',includeStr,{encoding:'utf8'});
		fs.writeFileSync('dist/app.min.include.html',includeMinStr,{encoding:'utf8'});
		return true;
	}
	return Q.when(true).then(write);
});

gulp.task('watch',['ctrlsjs','ctrlstemplates','ctrlscss'],function(){
	gulp.watch('src/*/*.*',['ctrlsjs','ctrlstemplates','ctrlscss']);
});
