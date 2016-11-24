var gulp 	    = require('gulp');
var rename    = require("gulp-rename");
var webserver = require('gulp-webserver');
var async     = require('async');
var _         = require('underscore');
var argv      = require('yargs').argv;
var replace   = require('gulp-replace-task');
var minifyCss = require('gulp-minify-css');

var sass      = require('gulp-sass');
var watch     = require('gulp-watch');

var paths = {
  sass : ['content/styles/sass/*.scss']
}


var port 	    = argv.port || 3000;
var API_SEVER = argv.server || "default";
var API_URL   = "";
var PATH_TO_COPY = argv.path || "./";

var files = [
               {
                  src  : "index.html",
                  dest : ""
                },
              {
                 src   : "./content/**/*",
                 dest  : "/content"
              },

              {
                src    : "./bower_components/**/*",
                dest   : "/bower_components"
              },
              {
                src    : "./app/**/*",
                dest   : "/app"
              },

              {
                src    : "/content/styles/sass/**",
                dest   : "/content/styles/css"
              },

          ]


// switch(API_SEVER) {

//     case "stage1":
//         API_URL = "staging_API_URL";
//         break;

//     case "stage2":
//         API_URL = "staging_API_URL";
//         break;

//     case "live":
//         API_URL = "Live_URL";
//         break;

//     default:
//         API_URL = "development_API_Url";
//         break;
// }


// Serving in localhost  && in production
gulp.task('run-local', ['replace', 'styles', 'serve', 'watch'])
gulp.task('live', ['replace'], function(){
  _.each(files, function(file){
      gulp
      .src(file.src)
      .pipe(gulp.dest(PATH_TO_COPY + file.dest))
      .on('end', function() {
        console.log("MOVED" + file.src + "TO :" + PATH_TO_COPY + file.dest);
      })
  });
})


// Replacing end points 
gulp.task('replace', function(callback) {
  async.series([
    function(cb) {
      gulp
      .src(['app/core/dataservice.js'])
      .pipe(rename('app/core/dataservice_run.js'))
      .pipe(gulp.dest('./'))
      .on('end', function() {
        cb(null, "DONE");
      })
    },

    function(cb) {
      gulp
      .src(['app/core/dataservice_run.js'], { base: './' })
      .pipe(replace({
        patterns: [
          {
            match: 'API_ENDPOINT',
            replacement: API_URL
          }
        ]
      }))
      .pipe(gulp.dest('./'))
      .on('end', function(){
        cb(null,"DONE")
      })
    },
  ], function(err,res){
        console.log("FINISHED REPLACING URLS");
        callback();
  });
});


gulp.task('copy', function(done){
  // Iterate through the files array and copy to proper destination
  _.each(files, function(file){
      gulp
      .src(file.src)
      .pipe(gulp.dest(PATH_TO_COPY + file.dest))
      .on('end', function() {
        console.log("MOVED" + file.src + "TO :" + PATH_TO_COPY + file.dest);
      })
  });
  done();
})

gulp.task('styles', function() {
    gulp.src('content/styles/sass/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('content/styles/css'));
});


//watch task
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['styles']);
});

gulp.task('serve', function() {
   gulp
   .src('./')
   .pipe(webserver({
      livereload: false,
      fallback: 'index.html',
      port: port,
      path: '/',
      directoryListing: false,
      open: true
    }))
    .on('end', function(){
    	console.log("Server listening on port " + port);
    });
});
