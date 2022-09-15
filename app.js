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
  $container.innerHTML = `
    <div class="carousel-slides">
      <img src="${images[images.length - 1]}">
      ${images.map(image => `<img src="${image}">`).join('')}
      <img src="${images[0]}">
    </div>
    <button class="carousel-control prev">&laquo;</button>
    <button class="carousel-control next">&raquo;</button>
   `;
  $container.style.width = `${imgSize(images[0]) + 10}px`;
  document.querySelector('.carousel-slides').style.setProperty('--currentSlide', currentSlideIndex);
  $container.style.opacity = 1;

  document.querySelector('.prev').addEventListener('click', () => {
    console.log(currentSlideIndex);
    if (currentSlideIndex === 1) {
      document.querySelector('.carousel-slides').style.transition = 'none';
      currentSlideIndex = images.length + 1;
      document.querySelector('.carousel-slides').style.setProperty('--currentSlide', currentSlideIndex);
      document.querySelector('.carousel-slides').style.transition = 'transform calc(var(--duration) * 1ms) ease-out';
    }
    document.querySelector('.carousel-slides').style.setProperty('--currentSlide', --currentSlideIndex);
    console.log(currentSlideIndex);
  });

  document.querySelector('.next').addEventListener('click', () => {
    ++currentSlideIndex;
    if (currentSlideIndex > images.length - 1) currentSlideIndex = 0;
    document.querySelector('.carousel-slides').style.setProperty('--currentSlide', currentSlideIndex);
  });
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg',
]);
