export const initialState = {
  basket: [],
  user: null,
  role: null,
  drawer: false,
  commentDrawer: false,
  commentBlog: "null",
  name: "",
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

    case "OPEN_COMMENT_DRAWER":
      return {
        ...state,
        commentDrawer: true,
        commentBlog: action.blogId,
      };

    case "CLOSE_COMMENT_DRAWER":
      return {
        ...state,
        commentDrawer: false,
        commentBlog: "null",
      };

    case "SET_NAME":
      return {
        ...state,
        name: action.name,
      };

    default:
      return state;
  }
};

export default reducer;
