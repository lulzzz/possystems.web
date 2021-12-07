import Item from '../components/Sales/Item';
import _ from 'lodash';

export default (
  previousState = {
    items: [],
    total: 0.0,
    subTotal: 0.0,
    totalTax: 0.0,
  },
  { type, item },
) => {
  if (type === 'ITEM_FETCH_SUCCEEDED') {
    let product = item.productDto;
    let cartItem = _.find(previousState.items, function(p) {
      return p.itemNumber === product.id;
    });

    let items = [];
    if (cartItem) {
      ++cartItem.quantity;
      items = [...previousState.items];
    } else {
      let item = new Item(
        product.id,
        product.category,
        product.product,
        1,
        product.salesPrice,
        0,
        [],
      );

      items = [...previousState.items, item];
    }

    let total = 0.0,
      subTotal = 0.0,
      totalTax = 0.0;

    items.forEach(r => {
      subTotal += r.subTotal();
      totalTax += r.tax(10);
    });

    total = _.round(subTotal + totalTax, 2);

    previousState = {
      items,
      total,
      subTotal,
      totalTax,
    };
  }

  return previousState;
};
