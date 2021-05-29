import _ from "lodash";
const initialState = {
  items: [],
  addedProductIds: [],
  quantityProductByID: {},
};

const addIds = (state = initialState.addedProductIds, action) => {
  if (state.indexOf(action) !== -1) {
    return state;
  } else {
    return [...state, action];
  }
};
const additems = (state = initialState.items, item) => {
  if (state.find((el) => el._id === item._id)) {
    return state;
  } else {
    return [...state, item];
  }
};

const addQuantityIds = (state = initialState.quantityProductByID, action) => {
  const id = action;
  return {
    ...state,
    // [id]: (state[id] || 0) + 1,
    [id]: state[id] || 0 || 1,
  };
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        addedProductIds: addIds(state.addedProductIds, action.payload._id),
        quantityProductByID: addQuantityIds(
          state.quantityProductByID,
          action.payload._id
        ),
        items: additems(state.items, action.payload),
      };
    case "REMOVE_FROM_CART":
      return {
        addedProductIds: state.addedProductIds.filter(
          (el) => el !== action.payload._id
        ),
        quantityProductByID: _.omit(state.quantityProductByID, [
          action.payload._id,
        ]),
        items: state.items.filter((el) => el._id !== action.payload._id),
      };
    case "CLEAR_CART":
      return {
        addedProductIds: [],
        quantityProductByID: {},
        items: [],
      };
    default:
      return state;
  }
};
