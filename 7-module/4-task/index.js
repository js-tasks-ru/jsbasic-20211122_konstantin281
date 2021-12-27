export default class StepSlider {
  #slider;
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
  }

  render() {
    this.#slider = this.createSlider();
    this.createSteps();
    this.#slider.addEventListener('click', this.sliderStepHandler);
    this.sliderTumbs = this.#slider.querySelector('.slider__thumb');
    this.sliderProgress = this.#slider.querySelector('.slider__progress');
    this.defaultDragAndDropOff();
    this.dragAndDropActivate();
  }

  createSlider() {
    this.slider = createHTML(`<div class="slider"><div class="slider__thumb"><span class="slider__value">${this.value}</span></div><div class="slider__progress"></div><div class="slider__steps"></div></div>`);
    function createHTML(html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.firstElementChild;
    }

    return this.slider;
  }

  leftRelative(e) {
    let left = e - this.#slider.getBoundingClientRect().left;
    let leftRelative = left / this.#slider.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    return leftRelative;
  }

  moveMouse = (e) => {
    let leftPercents = this.leftRelative(e) * 100;
    this.changeSliderProgress(leftPercents);
    this.changeValue(this.leftRelative(e));
    this.changeStepActive();
  }

  changeSliderProgress(leftPercents) {
    this.sliderTumbs.style.left = `${leftPercents}%`;
    this.sliderProgress.style.width = `${leftPercents}%`;
  }

  changeValue = (leftRelative) => {
    let SliderSegments = this.steps - 1;
    let notTrueValue = leftRelative * SliderSegments;
    this.trueValue = Math.round(notTrueValue);
  }

  changeStepActive() {
    const sliderValue = this.#slider.querySelector('.slider__value');
    sliderValue.textContent = this.trueValue;
    const activeStep = this.sliderSteps.querySelector('.slider__step-active');
    if (activeStep) {
      activeStep.classList.remove('slider__step-active');
    }
    this.sliderSteps.children[this.trueValue].classList.add('slider__step-active');
  }

  createSteps() {
    this.sliderSteps = this.#slider.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i++) {
      this.span = document.createElement('SPAN');
      if (`${this.value}` == i) {
        this.span.classList.add('slider__step-active');
      }
      this.sliderSteps.append(this.span);
    }
  }

  sliderStepHandler = (e) => {
    let leftRelative = this.leftRelative(e.clientX);
    this.changeValue(leftRelative);
    this.changeStepActive();
    let valuerPercents = this.trueValue / (this.steps - 1) * 100;
    this.changeSliderProgress(valuerPercents);
    const customEvent = new CustomEvent('slider-change', {
      detail: this.trueValue,
      bubbles: true
    });
    this.#slider.dispatchEvent(customEvent);
  }

  onPointerUp = (e) => {
    document.removeEventListener('pointermove', this.onPointerMove);
    this.#slider.classList.remove('slider_dragging');
    this.sliderTumbs.onpointerup = null;
    this.sliderStepHandler(e);
  }

  pointerDown = () => {
    this.#slider.classList.add('slider_dragging');
    document.addEventListener('pointermove', this.onPointerMove);
    document.onpointerup = this.onPointerUp;
  }

  onPointerMove = (e) => {
    this.moveMouse(e.clientX);
  }

  defaultDragAndDropOff() {
    let sliderTumbs = this.#slider.querySelector('.slider__thumb');
    sliderTumbs.ondragstart = () => false;
  }
  
  dragAndDropActivate() {
    this.sliderTumbs.onpointerdown = this.pointerDown;
  }

  get elem() {
    return this.#slider;
  }
}
