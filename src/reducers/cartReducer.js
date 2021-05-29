const initialState = {
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
        addedProductIds: addIds(state.addedProductIds, action.payload),
        quantityProductByID: addQuantityIds(
          state.quantityProductByID,
          action.payload
        ),
      };

    default:
      return state;
  }
};
