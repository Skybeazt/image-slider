"use strict";

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnRight = document.querySelector(".image-slider__button-btn_right");
const btnLeft = document.querySelector(".image-slider__button-btn_left");
const dotsContainer = document.querySelector(".dots-container");

let currentSlide = 0;
const numOfSlides = slides.length;

// Creates dots
const createDots = function (slidesNum) {
  slidesNum.forEach(function (_, index) {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dot-button" data-slide="${index}"></button>`
    );
  });
};

// Activate dot
const activateDot = function (dot) {
  document
    .querySelectorAll(".dot-button")
    .forEach((dot) => dot.classList.remove("dot-button__active"));
  document
    .querySelector(`.dot-button[data-slide="${dot}"]`)
    .classList.add("dot-button__active");
};

// Go to slide function
const goToSlide = function (number) {
  slides.forEach(function (slide, index) {
    slide.style.transform = `translateX(${(index - number) * 100}%)`;
  });
};

// Go to nex slide function
const nextSlide = function () {
  currentSlide === numOfSlides - 1 ? (currentSlide = 0) : currentSlide++;
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

// Go to previous Slide function
const previousSlide = function () {
  (currentSlide === 0 && (currentSlide = numOfSlides - 1)) || currentSlide--;
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

// Start slider function
const startSlider = function () {
  createDots(slides);
  goToSlide(0);
  activateDot(0);
};

// Initialise Slider
startSlider();

// Next slide event and handler
btnRight.addEventListener("click", nextSlide);
// Previous slide event and handler
btnLeft.addEventListener("click", previousSlide);

// Keyboard arrow keys event and handler
document.addEventListener("keydown", function (e) {
  (e.key === "ArrowRight" && nextSlide()) ||
    (e.key === "ArrowLeft" && previousSlide());
});

// Dots navigation
dotsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dot-button")) {
    currentSlide = +e.target.dataset.slide;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }
});
