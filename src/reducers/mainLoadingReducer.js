import { ACTIONS } from '../actions/loadingMainActions';

const initialState = {
  isLoading: false,
};

const mainLoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.STATUS:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

export default mainLoadingReducer;
