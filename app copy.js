// 이미지 사이즈 구하기
function imgSize(val) {
  const img = new Image();
  img.src = val;
  const { width } = img;
  return width;
}

let currentSlideIndex = 1;

const carousel = ($container, images) => {
  /* do somethig! */
  const renderSlides = () => {
    $container.innerHTML = `
      <div class="carousel-slides">
        <img src="${images.at(-1)}">
        ${images.map(image => `<img src="${image}">`).join('')}
        <img src="${images.at(0)}">
      </div>
      <button class="carousel-control prev">&laquo;</button>
      <button class="carousel-control next">&raquo;</button>
     `;
  };

  // $container.style.width = `${imgSize(images[0]) + 10}px`;
  // document.querySelector('.carousel-slides').style.setProperty('--currentSlide', currentSlideIndex);
  // $container.style.opacity = 1;

  window.addEventListener('load', () => {
    $container.style.width = `${imgSize(images[0]) + 10}px`;
    document.querySelector('.carousel-slides').style.setProperty('--currentSlide', currentSlideIndex);
    $container.style.opacity = 1;
  });

  // const $carouselSlides = document.querySelector('.carousel-slides');
  let isTransitioning = false;
  document.querySelector('.carousel-slides').addEventListener('transitionstart', () => {
    isTransitioning = true;
  });
  document.querySelector('.carousel-slides').addEventListener('transitionend', () => {
    isTransitioning = false;
    document.querySelector('.carousel-slides').style.setProperty('--duration', 0);
    if (currentSlideIndex === 0) currentSlideIndex = images.length;
    if (currentSlideIndex === images.length + 1) currentSlideIndex = 1;
    document.querySelector('.carousel-slides').style.setProperty('--currentSlide', currentSlideIndex);
  });

  document.querySelector('.prev').addEventListener('click', () => {
    if (isTransitioning) return;
    document.querySelector('.carousel-slides').style.setProperty('--duration', 500);
    document.querySelector('.carousel-slides').style.setProperty('--currentSlide', --currentSlideIndex);
  });

  document.querySelector('.next').addEventListener('click', () => {
    if (isTransitioning) return;
    document.querySelector('.carousel-slides').style.setProperty('--duration', 500);
    document.querySelector('.carousel-slides').style.setProperty('--currentSlide', ++currentSlideIndex);
  });
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg',
]);
