import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.renderGrid = createElement(`<div class="products-grid"><div class="products-grid__inner"></div></div>`);
    this.productInner = this.renderGrid.querySelector('.products-grid__inner');
    this.renderProducts();
  }

  renderProducts(filterItem) {
    if (filterItem === undefined) {
      for (let product of this.products) {
        let card = new ProductCard(product);
        this.productInner.append(card.elem);
      }
    } else {
      for (let product of filterItem) {
        let card = new ProductCard(product);
        this.productInner.append(card.elem);
      }
    }
  }

  updateFilter = filters => {
    Object.assign(this.filters, filters);
    this.addFilterProduct();
  }

  addFilterProduct() {
    let filterItem = this.products;
    for (let property in this.filters) {
      if (property === 'noNuts' && this.filters[property]) {
        filterItem = filterItem.filter(item => (item.nuts == false || !item.nuts));
      }
      if (property === 'vegeterianOnly' && this.filters[property]) {
        filterItem = filterItem.filter(item => (item.vegeterian == true));
      }
      if (property === 'maxSpiciness') {
        filterItem = filterItem.filter(item => (item.spiciness <= this.filters[property]));
      }
      if (property === 'category' && this.filters[property]) {
        filterItem = filterItem.filter(item => item.category == this.filters[property]);
      }
    }
    this.productInner.innerHTML = '';
    this.renderProducts(filterItem);
  }

  get elem() {
    return this.renderGrid;
  }
}
