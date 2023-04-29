import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const img = () => {
  return app.gulp
    .src(`${app.path.src.img}**/*.{jpg,jpeg,png,gif,webp}`)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "IMAGES",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(app.plugins.if(app.isBuild, webp()))
    .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.images)))
    .pipe(app.plugins.if(app.isBuild, app.gulp.src(`${app.path.src.img}**/*.{jpg,jpeg,png,gif,webp}`)))
    .pipe(app.plugins.if(app.isBuild, app.plugins.newer(`${app.path.build.images}**/*.{jpg,jpeg,png,gif,webp}`)))
    .pipe(
      app.plugins.if(
        app.isBuild,
        imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interlaced: true,
          optimizationLevel: 3,
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src([`${app.path.src.img}**/*.svg`, `!${app.path.src.img}svgicons/**/*.*`]))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browsersync.stream());
};
