import fs from "fs";

const messages = {
  html: "<!-- Базовый файл HTML, использовать !+tab что бы начать (пустой файл browsersync обновлять не будет) -->\n",
  scss: {
    style: "// Главный файл стилей, все импорты подключаются тут.\n",
    imports: `@import "_variables";\n@import "_mixins";\n@import "_fonts";\n@import "_libs";\n@import "_base";\n`,
    variables: "// Базовый файл для переменных.\n",
    mixins: `// Базовый файл для миксинов.
@mixin font($font_name, $file_name, $weight, $style) {
  @font-face {
    font-family: $font_name;
    font-display: swap;
    src: url("../assets/fonts/#{$file_name}.woff") format("woff"),
      url("../assets/fonts/#{$file_name}.woff2") format("woff2");
    font-weight: #{$weight};
    font-style: #{$style};
  }
}\n`,
    fonts:
      "// Сюда автоматически будут добавляться с помощью миксина стили для шрифтов.\n",
    libs: "// Подключение импортов файлов стилей плагинов/библиотек.\n",
    base: "// Базовый файл стилей, для глобальных селекторов.\n",
  },
  js: {
    base: `// Базовый файл скриптов, входящий.\nimport * as flsFunctions from "./modules/functions.js";\nflsFunctions.isWebp();\n`,
    functions: `
export function isWebp() {
  function testWebp(callback) {
    const webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height === 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebp(function (support) {
    const className = support === true ? "webp" : "no-webp";
    document.documentElement.classList.add(className);

    // FLS(support ? 'webp поддерживается' : 'webp не поддерживается')
  });
}
    `,
  },
};

export const init = (done) => {
  fs.mkdirSync(app.path.src.html, { recursive: true });
  fs.mkdirSync(app.path.src.html_pages, { recursive: true });
  fs.mkdirSync(app.path.src.html_components, { recursive: true });
  fs.mkdirSync(app.path.src.scss, { recursive: true });
  fs.mkdirSync(app.path.src.scss_global, { recursive: true });
  fs.mkdirSync(app.path.src.scss_components, { recursive: true });
  fs.mkdirSync(app.path.src.js, { recursive: true });
  fs.mkdirSync(app.path.src.js_modules, { recursive: true });
  fs.mkdirSync(app.path.src.img, { recursive: true });
  fs.mkdirSync(app.path.src.svg_icons, { recursive: true });
  fs.mkdirSync(app.path.src.fonts, { recursive: true });

  if (!fs.existsSync(app.path.src.html_pages + "index.html")) {
    fs.writeFile(
      app.path.src.html_pages + "index.html",
      messages.html,
      (err) => {
        if (err) throw err;
      }
    );
  }

  if (!fs.existsSync(app.path.src.scss_global + "style.scss")) {
    fs.writeFile(
      app.path.src.scss_global + "style.scss",
      messages.scss.style + messages.scss.imports,
      (err) => {
        if (err) throw err;
      }
    );
  }

  if (!fs.existsSync(app.path.src.scss_global + "_variables.scss")) {
    fs.writeFile(
      app.path.src.scss_global + "_variables.scss",
      messages.scss.variables,
      (err) => {
        if (err) throw err;
      }
    );
  }

  if (!fs.existsSync(app.path.src.scss_global + "_mixins.scss")) {
    fs.writeFile(
      app.path.src.scss_global + "_mixins.scss",
      messages.scss.mixins,
      (err) => {
        if (err) throw err;
      }
    );
  }

  if (!fs.existsSync(app.path.src.scss_global + "_fonts.scss")) {
    fs.writeFile(
      app.path.src.scss_global + "_fonts.scss",
      messages.scss.fonts,
      (err) => {
        if (err) throw err;
      }
    );
  }

  if (!fs.existsSync(app.path.src.scss_global + "_libs.scss")) {
    fs.writeFile(
      app.path.src.scss_global + "_libs.scss",
      messages.scss.libs,
      (err) => {
        if (err) throw err;
      }
    );
  }

  if (!fs.existsSync(app.path.src.scss_global + "_base.scss")) {
    fs.writeFile(
      app.path.src.scss_global + "_base.scss",
      messages.scss.base,
      (err) => {
        if (err) throw err;
      }
    );
  }

  if (!fs.existsSync(app.path.src.js + "app.js")) {
    fs.writeFile(app.path.src.js + "app.js", messages.js.base, (err) => {
      if (err) throw err;
    });
  }

  if (!fs.existsSync(app.path.src.js_modules + "functions.js")) {
    fs.writeFile(
      app.path.src.js_modules + "functions.js",
      messages.js.functions,
      (err) => {
        if (err) throw err;
      }
    );
  }
  done();
};
