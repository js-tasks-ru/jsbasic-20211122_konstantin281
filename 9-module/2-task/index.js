import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    // ... ваш код
    Promise.all([this.carouselRender(), this.menuRender(), this.sliderRender(), this.iconRender()]);

    this.products = await this.fetchProducts();
    await this.productGridRender();

    document.body.addEventListener('product-add', (event) => {
      let product = this.products.find(item => item.id == event.detail);
      this.cart.addProduct(product);
    });

    this.stepSlider.elem.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    this.ribbon.elem.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({
        category: event.detail
      });
    });

    document.getElementById('nuts-checkbox').onchange = (event) => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    };

    document.getElementById('vegeterian-checkbox').onchange = (event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    };
  }

  carouselRender() {
    let carousel = new Carousel(slides);
    let containerCarousel = document.body.querySelector(`[data-carousel-holder]`);
    containerCarousel.append(carousel.elem);
  }

  menuRender() {
    this.ribbon = new RibbonMenu(categories);
    let container = document.querySelector(`[data-ribbon-holder]`);
    container.append(this.ribbon.elem);
  }

  sliderRender() {
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    let container = document.querySelector(`[data-slider-holder]`);
    container.append(this.stepSlider.elem);
  }

  iconRender() {
    this.cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(this.cartIcon.elem);
    this.cart = new Cart(this.cartIcon);
  }

  productGridRender() {
    this.productsGrid = new ProductsGrid(this.products);
    let container = document.querySelector('[data-products-grid-holder]');
    container.innerHTML = "";
    container.append(this.productsGrid.elem);
  }

  async fetchProducts() {
    let products = await fetch("products.json");
    return await products.json();
  }
}
