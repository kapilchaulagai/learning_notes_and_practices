//Importing Module
import './shoppingCart.js';
console.log('Importing Module.');

/////////////////////////////////////////////////Closures is the reason for how it works
/*const shoppingCart = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 250;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `The ${quantity} ${product} has been added to the cart. Shipping cost is ${shippingCost}.`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(
      `The ${quantity} ${product} has been ordered from the suppliers.`
    );
  };

  return { orderStock, addToCart, cart, totalPrice, totalQuantity };
})();
shoppingCart.addToCart('Apples', 4);
shoppingCart.orderStock('Orange', 7);*/

////////////////////////////////////////////////////////////////////////////////////////////
//cloneDeep helps to clone the object without changing anything in the original value
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    { product: 'Apple', quantity: 4 },
    { product: 'Oranges', quantity: 6 },
  ],
  user: { loggedIn: true },
};

// const withoutClone = Object.assign({}, state);
//const withoutClone = JSON.parse(JSON.stringify(state));
//withoutClone.user.loggedIn = false;

const stateClone = cloneDeep(state);
stateClone.user.loggedIn = false;
console.log(state);
console.log(stateClone);
