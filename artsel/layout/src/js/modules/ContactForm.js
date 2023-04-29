export default class ContactForm {
  constructor(options) {
    this.$formEl = document.getElementById(options.form.container);
    this.$submitEl = document.getElementById(options.form.submit);
    this.fields = options.fields;
    this.captchaId = options.captcha.id;
    this.captchaKey = options.captcha.key;
    this.captchaWidget = null;

    this.inputs = [];
    this.errorFields = [];
    this.hasEvent = false;

    this.#events();
    this.#captcha();
  }

  // Хелперы
  #addError(nameField) {
    if (this.errorFields.indexOf(nameField) === -1) {
      this.errorFields.push(nameField);
    }
  }
  #removeError(nameField) {
    if (this.errorFields.indexOf(nameField) !== -1) {
      this.errorFields.splice(this.errorFields.indexOf(nameField), 1);
    }
  }
  #showError(input) {
    const msgEl = input.parentElement.querySelector(".contact-form__error");
    msgEl.classList.add("active");
  }
  #hideError(input) {
    const msgEl = input.parentElement.querySelector(".contact-form__error");
    msgEl.classList.remove("active");
  }

  // Валидаторы
  #validName(input, nameField) {
    const regex = /^[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+$/;
    if (!input.value.match(regex)) {
      this.#addError(nameField);
      input.classList.remove("success");
      input.classList.add("error");
      this.#showError(input);
    } else {
      this.#removeError(nameField);
      input.classList.remove("error");
      input.classList.add("success");
      this.#hideError(input);
    }
  }
  #validEmail(input, nameField) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    if (!regex) {
      this.#addError(nameField);
      input.classList.remove("success");
      input.classList.add("error");
      this.#showError(input);
    } else {
      this.#removeError(nameField);
      input.classList.remove("error");
      input.classList.add("success");
      this.#hideError(input);
    }
  }
  #validMessage(input, nameField) {
    if (input.value.length < 5) {
      this.#addError(nameField);
      input.classList.remove("success");
      input.classList.add("error");
      this.#showError(input);
    } else {
      this.#removeError(nameField);
      input.classList.remove("error");
      input.classList.add("success");
      this.#hideError(input);
    }
  }
  #validFields() {
    if (this.errorFields.length === 0) {
      this.$submitEl.removeAttribute("disabled");

      if (!this.hasEvent) {
        this.$submitEl.addEventListener("click", this.#sendMessage);
        this.hasEvent = true;
      }
    } else {
      this.$submitEl.setAttribute("disabled", "");

      if (this.hasEvent) {
        this.$submitEl.removeEventListener("click", this.#sendMessage);
        this.hasEvent = false;
      }
    }
  }
  #validCaptcha(captchaId) {
    const captcha = grecaptcha.getResponse(captchaId);

    if (captcha === "") {
      this.#showError(document.getElementById(this.captchaId));
      return false;
    } else {
      this.#hideError(document.getElementById(this.captchaId));
      return true;
    }
  }

  // Отправка
  #sendMessage = (e) => {
    e.preventDefault();

    if (!this.#validCaptcha(this.captchaWidget)) {
    } else {
      const textButton = this.$submitEl.innerHTML;
      this.$submitEl.innerHTML = "Loading...";

      const url = "https://artsel.thelookway.com/recaptcha.php";
      const data = this.inputs.reduce((acc, { name, value }) => {
        acc[name] = value;
        return acc;
      }, {});

      data.captcha = grecaptcha.getResponse(this.captchaWidget);

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          this.$submitEl.innerHTML = textButton;
          if (data.success) {
            this.#resetForm();
            alert("Данные отправлены, ответ сервера:\n" + JSON.stringify(data, null, 2));
          } else {
            alert("Данные отправлены, ответ сервера:\n" + JSON.stringify(data, null, 2));
          }
        })
        .catch((error) => {
          this.$submitEl.innerHTML = textButton;
          this.#resetForm();
          alert("Ошибка, ответ сервера:\n" + JSON.stringify(error, null, 2));
        });
    }
  };

  // Сброс формы
  #resetForm() {
    this.inputs.forEach((input) => {
      input.value = "";
    });
    Array.from(Object.keys(this.fields)).forEach((field) => {
      this.#addError(field);
    });
    this.#validFields();
  }

  // Рендер капчи
  #captcha() {
    window.onload = () => {
      this.captchaWidget = grecaptcha.render(this.captchaId, {
        sitekey: this.captchaKey,
      });
    };
  }

  // События
  #events() {
    Array.from(Object.keys(this.fields)).forEach((field) => {
      let el = this.$formEl.querySelector(`[name="${this.fields[field]}"]`);
      this.inputs.push(el);
      this.errorFields.push(field);

      if (field === "fullname") {
        el.addEventListener("input", () => {
          this.#validName(el, field);
          this.#validFields();
        });
      } else if (field === "email") {
        el.addEventListener("input", () => {
          this.#validEmail(el, field);
          this.#validFields();
        });
      } else if (field === "message") {
        el.addEventListener("input", () => {
          this.#validMessage(el, field);
          this.#validFields();
        });
      }
    });
  }
}
