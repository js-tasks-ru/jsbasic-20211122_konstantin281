export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product != (undefined || null)) {
      const card = {
        product: product,
        count: 1
      };
      const indexCard = this.cartItems.findIndex(item => item.product.name === product.name);
      indexCard >= 0 ? this.cartItems[indexCard].count++ : this.cartItems.push(card);
      this.onProductUpdate(this.cartItem);
    }
  }

  updateProductCount(productId, amount) {
    if (amount === -1) {
      this.cartItems.forEach((item, index) => {
        if (item.product.id === productId) {
          if (item.count > 1) {
            item.count--;
          } else {
            item.count--;
            this.cartItems.splice(index, 1);
          }
        }
      });
    } else if (amount === 1) {
      this.cartItems.forEach(item => {
        if (item.product.id === productId) {
          item.count++;
        }
      });
    }
    this.onProductUpdate(this.cartItem);
  }

  isEmpty() {
    return this.cartItems.length > 0 ? false : true;

  }

  getTotalCount() {
    let count = 0;
    this.cartItems.forEach(item => {
      count += item.count;
    });
    return count;
  }

  getTotalPrice() {
    let price = 0;
    this.cartItems.forEach(item => {
      price += item.product.price * item.count;
    });
    return price;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

