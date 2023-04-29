import { heroSlider } from "./sliders.js";

const sectionSlider = (sectionClass, slideClass, width) => {
  const section = document.querySelector(sectionClass);
  const slides = section.querySelectorAll(slideClass);
  const container = slides[0].parentElement;
  const sliderContainer = document.createElement("div");
  const sliderWrapper = document.createElement("div");
  const sliderDots = document.createElement("div");

  sliderContainer.classList.add("swiper-container");
  sliderWrapper.classList.add("swiper-wrapper");
  sliderDots.classList.add("swiper-pagination");
  sliderContainer.append(sliderWrapper);
  sliderContainer.append(sliderDots);

  let count = slides.length > 2;
  let flag = window.innerWidth < width;
  let slider = null;

  function toggleSlider(sliderEnable) {
    if (sliderEnable) {
      slides.forEach((slide) => {
        slide.classList.add("swiper-slide");
      });

      container.append(sliderContainer);
      sliderWrapper.append(...slides);

      slider = heroSlider(sectionClass + " .swiper-container");
      slider.init();
    } else {
      slider.destroy();
      slider = null;

      slides.forEach((slide) => {
        slide.classList.remove("swiper-slide");
      });

      container.innerHTML = "";
      container.append(...slides);
    }
  }

  if (count) {
    if (flag) {
      toggleSlider(true);
      flag = false;
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth < width && flag) {
        flag = false;
        if (!slider) toggleSlider(true);
      }

      if (window.innerWidth >= width && !flag) {
        flag = true;
        if (slider) toggleSlider(false);
      }
    });
  }
};

export default {
  sectionSlider,
};
