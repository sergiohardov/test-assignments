import Swiper, { Pagination } from "swiper";

export const heroSlider = (classSlider) => {
  return new Swiper(classSlider, {
    modules: [Pagination],
    init: false,
    grabCursor: true,
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // watchOverflow: true
    breakpoints: {
      450: {
        initialSlide: 1,
        slidesPerView: 1.3,
      },
      576: {
        initialSlide: 1,
        slidesPerView: 1.5,
      },
      768: {
        initialSlide: 1,
        slidesPerView: 2,
      },
      992: {
        initialSlide: 1,
        slidesPerView: 3,
      },
    },
  });
};
