export const initialState = {
  basket: [],
  user: null,
  role: null,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_ROLE":
      return {
        ...state,
        role: action.role,
      };

    default:
      return state;
  }
};

export default reducer;
