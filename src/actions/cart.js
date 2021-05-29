export const AddToCart = (id) => {
  return async (dispatch) => {
    await dispatch({ type: "ADD_TO_CART", payload: id });
  };
};
export const RemoveFromCart = (id) => {
  return async (dispatch) => {
    await dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };
};
export const ClearCart = () => {
  return async (dispatch) => {
    await dispatch({ type: "CLEAR_CART", payload: {} });
  };
};
