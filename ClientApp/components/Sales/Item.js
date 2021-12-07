import _ from 'lodash';
export default class Item {
  constructor(itemNumber, category, name, quantity, price, discount, history) {
    this.itemNumber = itemNumber;
    this.category = category;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.discount = discount;
    this.history = history;
  }

  // Adding a method to the constructor
  subTotal() {
    return _.round(this.quantity * this.price, 2);
  }

  tax(taxPercentage) {
    return _.round((this.subTotal() * taxPercentage) / 100, 2);
  }

  discount(discountSelectionType, discountOnTotal, discountOnItem) {
    let discountPercentage = 0.0;
    if (discountSelectionType === 1) {
      discountPercentage = discountOnTotal;
    } else if (discountSelectionType === 2) {
      discountPercentage = parseFloat(discountOnItem);
    }

    //let itemDiscount = Math.round((total() * discountPercentage) / 100, 2);

    return 0;
  }
}
