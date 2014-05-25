/* CONFIG */
var sourceMap = false,
    mangleJS = false;


/* Gulp Packages */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    minifyCSS = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat');


gulp.task('scripts', function(){


    gulp.src([
            'src/lib/3DGridEffect/js/modernizr.custom.js',
            'src/js/html5shiv.js',
            'src/js/respond.min.js'
            ])
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));

    //  The horror.
    var output = gulp.src([
            'src/js/jquery.js',
            'src/assets/bootstrap/js/bootstrap.min.js',
            'src/js/jquery.animateNumbers.js',
            'src/js/responsive-tabs.js',
            'src/lib/jQuery-One-Page-Nav/jquery.scrollTo.js',
            'src/lib/jQuery-One-Page-Nav/jquery.nav.js',
            'src/lib/jquery-parallax/scripts/jquery.parallax-1.1.3.js',
            'src/lib/ajax-html-contact-form/js/validation.js',
            'src/lib/superslides/dist/jquery.superslides.js',
            'src/lib/jquery.appear/jquery.appear.js',
            'src/lib/jquery.bxslider/jquery.bxslider.min.js',
            'src/lib/3DGridEffect/js/classie.js',
            'src/lib/3DGridEffect/js/helper.js',
            'src/lib/3DGridEffect/js/grid3d.js',
            'src/lib/magnific-popup/dist/jquery.magnific-popup.js',
            'src/js/custom.js',
            'src/js/mailchimp.js'
        ])
    .pipe(plumber()) 
    .pipe(uglify(
        {outSourceMap:sourceMap, mangle:mangleJS}
    ))
    .pipe(concat('scripts.js'));
    
    return output.pipe(gulp.dest('./build/js')).on('error', function(err){console.log(err)});

});


gulp.task('styles', function(){

    gulp.src('src/lib/magnific-popup/dist/magnific-popup.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/styles'));

    return gulp.src([
            'src/css/imports.css',
            'src/assets/bootstrap/css/bootstrap.css',
            'src/css/style.css',
            'src/css/color-2.css',
            'src/css/google-font.css',
            'src/lib/font-awesome/css/font-awesome.min.css',
            'src/lib/superslides/dist/stylesheets/superslides.css',
            'src/lib/jquery.bxslider/jquery.bxslider.css',
            'src/lib/3DGridEffect/css/component.css',
        ])
    .pipe(minifyCSS())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./build/styles'));

});


gulp.task('markup', function(){

    //Generate minified html for ajax loaded stories
    ['javeria.html', 'shaloom.html', 'sobia.html'].forEach(function(sourcePage){

        gulp.src("src/"+sourcePage)
            .pipe(minifyHTML())
            .pipe(gulp.dest('./build'));

    });

    return gulp.src('src/index.html')
    .pipe(minifyHTML())    
    .pipe(gulp.dest('./'));

});


/* Make embedded resources available for tightly-coupled template bs */
gulp.task('fonts', function(){
  gulp.src('src/lib/font-awesome/fonts/*')
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('lib-images', function(){
  gulp.src('src/lib/3DGridEffect/img/*')
    .pipe(gulp.dest('./build/img'));
})


gulp.task('default', ['scripts', 'styles', 'markup', 'fonts', 'lib-images']);