import { TOGGLE_ADMIN } from "./adminActions";

const initialState = {
  isAdmin: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADMIN:
      return {
        ...state,
        isAdmin: !state.isAdmin,
      };
    default:
      return state;
  }
};

export default adminReducer;
