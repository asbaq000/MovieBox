export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
    case "USER_REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_LOGIN_FAIL":
    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    case "AUTH_CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};
