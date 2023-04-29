import ContactForm from "../modules/ContactForm.js";

const contactForm = new ContactForm({
  form: {
    container: "about-section-form",
    submit: "about-section-form-submit",
  },
  fields: {
    fullname: "form_fullname",
    email: "form_email",
    message: "form_message",
  },
  captcha: {
    id: "about-section-form-captcha",
    key: "6LdZ8EYlAAAAAKOPykM1rgBg4oeAjoXMY8KlnPFg",
  },
});

export default function () {}
