export function isWebp() {
  function testWebp(callback) {
    const webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height === 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebp(function (support) {
    const className = support === true ? "webp" : "no-webp";
    document.documentElement.classList.add(className);

    // FLS(support ? 'webp поддерживается' : 'webp не поддерживается')
  });
}

export function reCaptchaScript() {
  const script = document.createElement("script");
  script.src = "https://www.google.com/recaptcha/api.js";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

