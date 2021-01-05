export const initialState = {
  basket: [],
  user: null,
  role: null,
  drawer: false,
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

    case "OPEN_DRAWER":
      return {
        ...state,
        drawer: true,
      };

    case "CLOSE_DRAWER":
      return {
        ...state,
        drawer: false,
      };

    default:
      return state;
  }
};

export default reducer;
