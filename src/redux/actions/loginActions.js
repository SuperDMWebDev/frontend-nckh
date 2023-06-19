// actions.js
export const setLoginStatus = (isLoggedIn) => {
  return {
    type: 'SET_LOGIN_STATUS',
    payload: isLoggedIn
  };
};
