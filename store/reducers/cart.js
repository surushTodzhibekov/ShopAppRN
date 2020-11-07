import CartItem from "../../models/cart-item";
import { ADD_TO_CART } from "../actions/cart";

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
  }
  return state;
};
