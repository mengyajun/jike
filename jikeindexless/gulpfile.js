var gulp = require('gulp');
var less = require('gulp-less');
var rev = require('gulp-rev')
var revCollector = require('gulp-rev-collector');
var minifyHTML = require('gulp-minify-html');

gulp.task('less',function(){
	gulp.src('css/*.less')
		.pipe(rev())
		.pipe(less())
		.pipe(gulp.dest('dist/css'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('rev/css'))
})

gulp.task('img',function(){
	gulp.src('img/*')
	.pipe(gulp.dest('dist/img'))
})
gulp.task('minifyhtml',function(){
	gulp.src(['rev/**/*.json','./index.html'])
		.pipe(revCollector(
			{
				replaceReved: true,
				dirReplacements: {
					'css': '/dist/css'
				}
			}
		))
		.pipe(minifyHTML(
			{
				empty:true,
				spare:true
			}
			))
		.pipe(gulp.dest('dist'));
});


gulp.task('default',['img','less','minifyhtml'],function(){
	console.log('over');
});
