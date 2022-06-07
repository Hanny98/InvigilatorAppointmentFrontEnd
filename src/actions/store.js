import {
  CHANGE_SIDEBARSHOW,
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_ERROR,
  HIDE_ERROR,
  SHOW_LANGUAGE_SELECTOR,
  HIDE_LANGUAGE_SELECTOR,
} from "./types";

export const showLoading = (text = "") => ({
  type: SHOW_LOADING,
  payload: {
    text: text,
  },
});

export const hideLoading = () => ({
  type: HIDE_LOADING,
});

export const dispatchShowError = (text, eventID) => (dispatch) => {
  dispatch({
    type: SHOW_ERROR,
    payload: {
      text: text,
      eventID: eventID,
    },
  });
  return true;
};

export const hideError = () => ({
  type: HIDE_ERROR,
});
