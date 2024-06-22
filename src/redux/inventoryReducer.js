import {
  SET_PRODUCTS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  DISABLE_PRODUCT,
} from "./actions";

const initialState = {
  products: [],
  totalValue: 0,
  outOfStock: 0,
  categories: [],
  isAdmin: true,
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        ...calculateStats(action.payload),
      };
    case DELETE_PRODUCT:
      debugger;
      const productsAfterDelete = state.products.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        products: productsAfterDelete,
        ...calculateStats(productsAfterDelete),
      };
    case UPDATE_PRODUCT:
      debugger;
      const { productId, updatedProduct } = action.payload;
      debugger;
      const updatedProducts = state.products.map((product) =>
        product.id === productId ? updatedProduct : product
      );
      return {
        ...state,
        products: updatedProducts,
        ...calculateStats(updatedProducts),
      };
    case DISABLE_PRODUCT:
      debugger;
      const disabledProducts = state.products.map((product) =>
        product.id === action.payload ? { ...product, disabled: true } : product
      );
      return {
        ...state,
        products: disabledProducts,
      };

    default:
      return state;
  }
};

const calculateStats = (products) => {
  debugger;
  const totalValue = products?.reduce(
    (total, product) => total + (product.disabled ? 0 : product.value),
    0
  );
  const outOfStock = products?.filter(
    (product) => product.quantity === 0
  ).length;
  const categories = [...new Set(products?.map((product) => product.category))];

  return {
    totalValue,
    outOfStock,
    categories,
  };
};

export default inventoryReducer;
