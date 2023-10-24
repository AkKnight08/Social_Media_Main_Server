const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");

gulp.task("css", async function () {
  // Import the gulp-rev module
  const rev = await import("gulp-rev");

  // Minify CSS
  console.log("Minifying CSS");
  await new Promise((resolve, reject) => {
    gulp
      .src("./assets/sass/**/*.scss")
      .pipe(sass())
      .pipe(cssnano())
      .pipe(gulp.dest("./public/assets"));
  });

  // Minify and revision CSS files
  await new Promise((resolve, reject) => {
    gulp
      .src("./assets/**/*.css")
      .pipe(rev())
      .pipe(gulp.dest("./public/assets"))
      .pipe(
        rev.manifest({
          cwd: "public",
          merge: true,
        })
      )
      .pipe(gulp.dest("./public/assets"))
      .on("end", resolve)
      .on("error", reject);
  });

  console.log("Minified and revised CSS");
});

// Minify and revise JavaScript files
gulp.task("js", async function () {
  // Import the gulp-rev module
  const rev = await import("gulp-rev");

  console.log("Minifying js...");
  await new Promise((resolve, reject) => {
    gulp
      .src("./assets/**/*.js")
      .pipe(uglify())
      .pipe(rev())
      .pipe(gulp.dest("./public/assets"))
      .pipe(
        rev.manifest({
          cwd: "public",
          merge: true,
        })
      )
      .pipe(gulp.dest("./public/assets"))
      .on("end", resolve)
      .on("error", reject);
  });
});

// Compress images
gulp.task("images", async function () {
  // Import the gulp-rev module
  const rev = await import("gulp-rev");
const imagemin = await import("gulp-imagemin");
  console.log("Compressing images...");
  await new Promise((resolve, reject) => {
    gulp
      .src("./assets/**/*.+(png|jpg|gif|svg|jpeg)")
      .pipe(imagemin())
      .pipe(rev())
      .pipe(gulp.dest("./public/assets"))
      .pipe(
        rev.manifest({
          cwd: "public",
          merge: true,
        })
      )
      .pipe(gulp.dest("./public/assets"))
      .on("end", resolve)
      .on("error", reject);
  });
});

// Empty the public/assets directory

gulp.task("clean:assets", async function () {
 const del = await import("del");
    await del("./public/assets");
});

// Define a build task that depends on other tasks
gulp.task(
  "build",
  gulp.series("clean:assets", "css", "js", "images", function (done) {
    console.log("Building assets");
    done();
  })
);
