import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./products/productsSlice";
import cartReducer, { reset as resetCart } from "./cart/cartSlice";
import categoriesReducer, {
  reset as resetCategories,
} from "./categories/categoriesSlice";

const appReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  categories: categoriesReducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any
) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
