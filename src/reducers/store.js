import {
  CHANGE_SIDEBARSHOW,
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_ERROR,
  HIDE_ERROR,
  SHOW_LANGUAGE_SELECTOR,
  HIDE_LANGUAGE_SELECTOR,
} from "../actions/types";

const initialState = {
  showLoading: false,
  loadingText: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SHOW_LOADING:
      return {
        ...state,
        showLoading: true,
        loadingText: payload.text,
      };
    case HIDE_LOADING:
      return {
        ...state,
        showLoading: false,
        loadingText: "",
      };

    default:
      return state;
  }
}
