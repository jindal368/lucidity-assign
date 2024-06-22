export const SET_PRODUCTS = "SET_PRODUCTS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DISABLE_PRODUCT = "DISABLE_PRODUCT";

export const setProducts = (product) => ({
  type: SET_PRODUCTS,
  payload: product,
});

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  payload: productId,
});

export const updateProduct = (productId, updatedProduct) => ({
  type: UPDATE_PRODUCT,
  payload: { productId, updatedProduct },
});

export const disableProduct = (productId) => ({
  type: DISABLE_PRODUCT,
  payload: productId,
});
