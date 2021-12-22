import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.renderSlider();
  }

  renderSlider() {
    this.carousel = createElement(`<div class="carousel"></div>`);
    const arrowLeft = createElement(`<div class="carousel__arrow carousel__arrow_left"><img src="../../assets/images/icons/angle-left-icon.svg" alt="icon"></div>`);
    const arrowRight = createElement(`<div class="carousel__arrow carousel__arrow_right"><img src="../../assets/images/icons/angle-icon.svg" alt="icon"></div>`);
    const carouselInner = createElement(`<div class="carousel__inner"></div>`);

    for (let item of this.slides) {
      carouselInner.append(createElement(`
        <div class="carousel__slide" data-id="${item.id}">
          <img src="../../assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">&euro;${item.price.toFixed(2)}</span>
            <div class="carousel__title">${item.name}</div>
            <button type="button" class="carousel__button">
              <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `)
      );
    }

    let SLIDE_INDEX = 1;
    let START_POSITION = 0;

    if (SLIDE_INDEX === 1) {arrowLeft.style.display = "none";}

    arrowRight.addEventListener("click", function() {
      carouselInner.style.transform = `translateX(-${START_POSITION += document.querySelector('.carousel__inner').offsetWidth}px)`;
      SLIDE_INDEX++;
    });

    arrowLeft.addEventListener("click", function() {
      carouselInner.style.transform = `translateX(-${START_POSITION -= document.querySelector('.carousel__inner').offsetWidth}px)`;
      SLIDE_INDEX--;
    });

    this.carousel.addEventListener('click', function(event) {
      arrowLeft.style.display = SLIDE_INDEX === 1 ? "none" : "";
      arrowRight.style.display = SLIDE_INDEX === carouselInner.children.length ? "none" : "";
      if (event.target.closest('.carousel__button')) {
        const e = new CustomEvent('product-add', {
          detail: event.target.closest('.carousel__slide').dataset.id,
          bubbles: true
        });
        this.dispatchEvent(e);
      }
    });

    this.carousel.append(arrowLeft);
    this.carousel.append(arrowRight);
    this.carousel.append(carouselInner);
  }

  get elem() {
    return this.carousel;
  }
}
