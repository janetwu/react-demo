import * as types from "../action-types";
const initState = {
  collapse: false
};
export default function setting(state = initState, action) {
  switch (action.type) {
    case types.TOGGLE_COLLAPSE:
      return {
        ...state,
        collapse: !state.collapse
      };
    
    default:
      return state;
  }
}