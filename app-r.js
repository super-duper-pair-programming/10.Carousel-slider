const carousel = ($container, images) => {
  /* do somethig! */

  let $carouselSlide;
  let currentSlideIndex = 1;
  let isTransitioning = false;

  const renderSlides = () => {
    $container.innerHTML = `
    <div class="carousel-slides">
      <img src="${images.at(-1)}">
      ${images.map(image => `<img src="${image}">`).join('')}
      <img src="${images.at(0)}">
    </div>
    <button class="carousel-control prev">&laquo;</button>
    <button class="carousel-control next">&raquo;</button>`;

    $carouselSlide = document.querySelector('.carousel-slides');
  };

  const initCarousel = () => {
    $container.style.width = `${document.querySelector('img').offsetWidth}px`;
    $carouselSlide.style.setProperty('--currentSlide', 1);
    $container.style.opacity = 1;
  };

  const moveEndToEnd = () => {
    $carouselSlide.style.setProperty('--duration', 0);
    if (currentSlideIndex === 0) currentSlideIndex = images.length;
    if (currentSlideIndex === images.length + 1) currentSlideIndex = 1;
    $carouselSlide.style.setProperty('--currentSlide', currentSlideIndex);
  };

  const movePrevOrNext = btn => {
    $carouselSlide.style.setProperty('--duration', 500);
    $carouselSlide.style.setProperty('--currentSlide', (currentSlideIndex += btn.matches('.prev') ? -1 : 1));
  };

  window.addEventListener('DOMContentLoaded', renderSlides);

  window.addEventListener('load', initCarousel);

  $container.addEventListener('transitionstart', () => {
    isTransitioning = true;
  });

  $container.addEventListener('transitionend', () => {
    isTransitioning = false;
    moveEndToEnd();
  });

  $container.addEventListener('click', e => {
    if (!e.target.matches('.prev, .next') || isTransitioning) return;
    movePrevOrNext(e.target);
  });
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg',
]);

// [변경사항]
// - 이미지가 아직 로드되지 않았을 때 container의 width를 계산하면서 발생하는 오류를
// window에서 load 이벤트를 감지한 후 container의 width를 계산함으로써 해결
// - renderSlides, initCarousel, moveEndToEnd, movePrevOrNext 함수를 생성해
// 관련 코드를 묶어줌으로써 event listener 내부 코드 간소화
// - document.querySelector('.carousel-slides')가 중복되므로 변수화
// - 이미지 width 계산 방식 간소화
// - prev 버튼과 next 버튼 각각에 붙였던 event listener를 $container에 붙여주어 이벤트 위임
