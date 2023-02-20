import { GET_PET_INFO, PET_INFO_FAIL } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PET_INFO:
      return { pet_info: action.payload };
    case PET_INFO_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
