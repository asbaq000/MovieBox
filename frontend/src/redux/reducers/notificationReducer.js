const initialState = {
  message: "",
  visible: false,
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        message: action.payload,
        visible: true,
      };
    case "HIDE_NOTIFICATION":
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
};
