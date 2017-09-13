import gulp from 'gulp';
import less from 'gulp-less';
import plumber from 'gulp-plumber';
import minifyCSS from 'gulp-minify-css';
import concat from 'gulp-concat';
import webpack from 'gulp-webpack';
import webpackConfigDev from './webpack.config.dev';
import webpackConfigProd from './webpack.config.prod';

// css任务, 处理LESS文件, 压缩合并CSS文件
// 这个任务也可以在webpack中运行, 可以参考说明文件或网站
gulp.task('css', () => gulp.src('./styles/**/*.less')
  .pipe(plumber())
  .pipe(less()) // 将LESS转换为CSS文件
  .pipe(minifyCSS()) // 压缩CSS文件
  .pipe(concat('style.min.css')) // 将css文件合并为一个, 如果想得到多个CSS文件则用gulp-rename /*.pipe(rename({ extname: '.min.css' }))*/
  .pipe(gulp.dest('dist/styles'))); // 制定输出目录

// webpack任务, 从webpack.config.js文件中获取webpack的配置并打包
// 有dev和prod两个版本
gulp.task('webpack-dev', () => gulp.src('./src/**/*.jsx')
  .pipe(webpack(webpackConfigDev))
  .pipe(gulp.dest('dist/scripts')));

gulp.task('webpack-prod', () => gulp.src('./src/**/*.jsx')
  .pipe(webpack(webpackConfigProd))
  .pipe(gulp.dest('dist/scripts')));

/**
  * static任务
  * 主要负责将静态文件放置到/dist/*目录下
  * */
gulp.task('static', () => {
  gulp.src('./src/fonts/**/*.*')
    .pipe(gulp.dest('./dist/fonts'));
  gulp.src('./src/images/**/*.*')
    .pipe(gulp.dest('./dist/images'));
  gulp.src('./src/page/**/*.*')
    .pipe(gulp.dest('./dist'));
});

// 监控相应的目录，这样在文件被修改时，gulp会自动执行相应的任务
gulp.task('watch', ['css', 'webpack-dev'], () => {
  gulp.watch('./styles/**/*.less', ['css']);
  gulp.watch('./src/**/*.js*', ['webpack-dev']);
});

/**
  * 把 webpack css static 等任务打包，
  * 这样在执行gulp的时候，就会自动执行webpack，css, static任务
  */
gulp.task('default', ['css', 'webpack-dev', 'static'], () => { });
