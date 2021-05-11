export const courcesReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT":
      return [...action.payload];
    case "CREATE_COURSE":
      return [...action.payload];
    case "UPDATE_COURSE":
      return [...action.payload];
    default:
      return state;
  }
};
