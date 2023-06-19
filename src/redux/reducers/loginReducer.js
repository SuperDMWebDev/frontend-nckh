// reducers.js
const initialState = {
  isLogin: false
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_STATUS':
      return {
        ...state,
        isLogin: action.payload
      };
    default:
      return state;
  }
};
