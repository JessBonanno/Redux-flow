import * as actions from '../actions';

const initialState = {
  results: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.STORE_RESULT:
      return {
        ...state,
        // immutable way of updating an array instead of pushing to old array concat will create a new array combining old array with added values
        results: state.results.concat({ id: new Date(), value: action.result }),
      };
    case actions.DELETE_RESULT:
      // * one way of deleting from array immutably
      // const id = action.id;
      // const newArray = [...state.results];
      // newArray.splice(id, 1);
      // * filter will return a new array filtering out desired element
      const id = action.id;
      const updatedArray = state.results.filter(r => r.id !== id);
      return {
        ...state,
        results: updatedArray,
      };
    default:
      break;
  }
  return state;
};

export default reducer;

