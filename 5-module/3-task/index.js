function initCarousel() {
  let carousel = document.querySelector('.carousel__inner');
  let left = document.querySelector('.carousel__arrow_left');
  let right = document.querySelector('.carousel__arrow_right');
  let INDEX = 0;

  INDEX === 0 && (left.style.display = 'none');

  left.addEventListener('click', function() {
    INDEX--;
    INDEX === 0 && (left.style.display = 'none');
    carousel.style.transform = 'translateX(' + `${-(INDEX) * carousel.offsetWidth}` + 'px)';
    right.style.display = '';
  });

  right.addEventListener('click', function() {
    INDEX++;
    INDEX === 3 && (right.style.display = 'none');
    carousel.style.transform = 'translateX(' + `${-(INDEX) * carousel.offsetWidth}` + 'px)';
    left.style.display = '';
  });
}
