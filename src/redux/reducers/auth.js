import {
  ISUSER,
  NOUSER,
  USER_SIGNIN,
  USER_SIGNIN_FAIL,
  USER_UPDATED,
  USER_UPDATED_FAIL,
  USER_PROFILE,
  USER_PROFILE_FAIL,
  CREATE_PET,
  UPDATE_PET,
  DELETE_PET,
  SIGN_OUT,
  USER_CREATED,
  USER_CREATED_FAIL,
} from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN:
      return { ...state, token: action.payload.auth_token };
    case USER_SIGNIN_FAIL:
      return { err_message: action?.payload };
    case ISUSER:
      return { ...state, user: action.payload };
    case NOUSER:
      return { ...state };
    case USER_PROFILE:
      return { ...state, profile: action.payload };
    case USER_PROFILE_FAIL:
      return { err_message: action?.payload };
    case USER_CREATED:
      return { ...state, user: action?.payload };
    case USER_UPDATED:
      return { ...state, profile: { ...state.profile, ...action.payload } };
    case CREATE_PET:
      return { ...state, ...state.profile.owner_pets.push(action?.payload) };
    case UPDATE_PET:
      return {
        ...state,
        profile: {
          ...state.profile,
          owner_pets: state.profile.owner_pets.map((item) => {
            return item.id === action.payload.id ? action.payload : item;
          }),
        },
      };
    case DELETE_PET:
      const data = state.profile.owner_pets;
      const newData = data.filter((pet) => pet.id !== action.payload.item_id);
      return { ...state, profile: { ...state.profile, owner_pets: newData } };
    case SIGN_OUT:
      return (state = []);
    default:
      return state;
  }
};
