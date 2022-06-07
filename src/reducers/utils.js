/**
 *
 * @param {() => Promise<any>} func
 * @param {(any) => any} getAction
 */
export const withThunk = (func, getAction) => (dispatch, state) =>
  func().then((data) => {
    dispatch(getAction(data));

    return data;
  });
