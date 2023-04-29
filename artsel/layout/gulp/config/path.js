import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = "./dist";
const srcFolder = "./src";

export const path = {
  build: {
    folder: `${buildFolder}/`,
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/assets/img/`,
    fonts: `${buildFolder}/assets/fonts/`,
  },
  src: {
    html: `${srcFolder}/html/`,
    html_pages: `${srcFolder}/html/pages/`,
    html_components: `${srcFolder}/html/components/`,
    scss: `${srcFolder}/scss/`,
    scss_global: `${srcFolder}/scss/global/`,
    scss_components: `${srcFolder}/scss/components/`,
    js: `${srcFolder}/js/`,
    js_modules: `${srcFolder}/js/modules/`,
    img: `${srcFolder}/img/`,
    svg_icons: `${srcFolder}/img/svgicons/`,
    fonts: `${srcFolder}/fonts/`,
  },
  watch: {
    html: `${srcFolder}/html/**/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
  },
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: "",
};
