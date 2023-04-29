// Базовый файл скриптов, входящий.
import { isWebp, reCaptchaScript } from "./modules/functions.js";
import heroSection from "./components/hero-section.js";
import contactSection from "./components/contact-section.js";

// Проверка на WebP
isWebp();

// Подключение recaptcha script (v2)
reCaptchaScript();

// HeroSection
heroSection.sectionSlider(".hero-section", ".member-card", 1200);

// ContactSection
contactSection();
