import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // First getting product
      const addedProduct = action.product;
      //Second storing it in a constant
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartIem;
      // First find out wether that product is already part of items
      // Adding new product by adding a new key to items
      if (state.items[addedProduct.id]) {
        // already have an item in the cart
        updatedOrNewCartIem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
        // return {
        //   ...state,
        //   items: { ...state.items, [addedProduct.id]: updatedCart },
        //   totalAmount: state.totalAmount + prodPrice,
        // }; after giving universal variable
      } else {
        updatedOrNewCartIem = new CartItem(1, prodPrice, prodTitle, prodPrice); //Provide quantity ... last sum. Our sum is a prodPrice
        // newCartItem has added to our item object
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartIem }, //copy all existing item, then adding new item [addedProduct.id] values newCartItem
        totalAmount: state.totalAmount + prodPrice,
      };

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      let updatedCartItems;
      const currentQty = selectedCartItem.quantity;
      if (currentQty > 1) {
        // need to reduce it not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        // Remove item from cart
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    // clears card by pressing order button
    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
  }
  return state;
};
