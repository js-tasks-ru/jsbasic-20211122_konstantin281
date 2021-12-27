export default class StepSlider {
  #elem
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.#elem = this.createSlider();
  }

  createSlider () {
    this.slider = createHTML(`<div class="slider"><div class="slider__thumb"><span class="slider__value">${this.value}</span></div><div class="slider__progress"></div><div class="slider__steps"></div></div>`);
    function createHTML(html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.firstElementChild;
    }
    this.createSteps();
    this.clickThumb();

    return this.slider;
  }

  createSteps () {
    const steps = this.slider.querySelector('.slider__steps');
    for (let i = 0; i < this.steps ; ++i) {
      this.span = document.createElement('span');
      if (`${this.value}` == i) {
        this.span.classList.add('slider__step-active');
      }
      steps.append(this.span);
    }
  }

  clickThumb () {
    const sliderProgress = this.slider.querySelector('.slider__progress');
    const sliderValue = this.slider.querySelector('.slider__value');
    const sliderSteps = this.slider.querySelector('.slider__steps');
    const sliderTumbs = this.slider.querySelector('.slider__thumb');

    sliderProgress.style.width = '0%';

    this.slider.addEventListener('click', e => {
      const left = e.clientX - this.slider.getBoundingClientRect().left;
      const leftRelative = left / this.slider.offsetWidth;
      const sliderSegment = this.steps - 1;
      const trueValue = Math.round(leftRelative * sliderSegment);
      const leftPercents = trueValue / sliderSegment * 100;

      for (let i = 0; i < sliderSteps.childNodes.length; i++) {
        sliderSteps.childNodes[i].classList.remove('slider__step-active');
        if (trueValue == i) {
          sliderSteps.childNodes[i].classList.add('slider__step-active');
        }
      }
      sliderTumbs.style.left = `${leftPercents}%`;
      sliderProgress.style.width = `${leftPercents}%`;
      sliderValue.textContent = trueValue;
      const customEvent = new CustomEvent("slider-change", {
        detail: trueValue,
        bubbles: true
      });
      this.slider.dispatchEvent(customEvent);
    });
  }

  get elem () {
    return this.#elem;
  }
}
