import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem = this.renderMenu();
  }

  renderMenu() {
    const menu = createElement(`<div class="ribbon"><button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible"><img src="../../assets/images/icons/angle-icon.svg" alt="icon"></button><nav class="ribbon__inner">${this.renderLinks()}</nav><button class="ribbon__arrow ribbon__arrow_right"><img src="../../assets/images/icons/angle-icon.svg" alt="icon"></button></div>`);
    const arrowRight = menu.querySelector('.ribbon__arrow_right');
    const arrowLeft = menu.querySelector('.ribbon__arrow_left');
    const ribbonInner = menu.querySelector('.ribbon__inner');
    const links = menu.querySelectorAll('.ribbon__item');

    arrowRight.classList.add('ribbon__arrow_visible');
    arrowLeft.classList.remove('ribbon__arrow_visible');

    arrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    arrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      const endScroll = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth;
      // eslint-disable-next-line no-unused-expressions
      ribbonInner.scrollLeft === 0 ? arrowLeft.classList.remove('ribbon__arrow_visible') : arrowLeft.classList.add('ribbon__arrow_visible');
      // eslint-disable-next-line no-unused-expressions
      endScroll < 1 ? arrowRight.classList.remove('ribbon__arrow_visible') : arrowRight.classList.add('ribbon__arrow_visible');
    });

    ribbonInner.addEventListener('click', (event) => {
      event.preventDefault();
      for (let link of links) {
        if (event.target === link) {
          link.classList.add('ribbon__item_active');

          const e = new CustomEvent('ribbon-select', {
            detail: link.dataset.id,
            bubbles: true
          });
          link.dispatchEvent(e);

        } else {link.classList.remove('ribbon__item_active');}
      }
    });

    return menu;
  }

  renderLinks() {
    return this.categories.map(item => {return `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`;}).join('');
  }
}
