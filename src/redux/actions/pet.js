import * as api from '../../API/index';
import {
  CREATE_PET,
  CREATE_PET_FAIL,
  GET_PET_INFO,
  PET_INFO_FAIL,
  UPDATE_PET_FAIL,
  UPDATE_PET,
  DELETE_PET_FAIL,
  DELETE_PET,
  USER_PROFILE,
} from './types';
import { setAlert } from './alert';

export const createPet = (formData) => async (dispatch) => {
  try {
    const res = await api.createPet(formData);
    if (res.status === 201) {
      dispatch({ type: CREATE_PET, payload: res.data });
    }
  } catch (err) {
    dispatch({
      type: CREATE_PET_FAIL,
      payload: err?.response?.data,
    });
    const error = err?.response?.data;
    if (error) {
      dispatch(setAlert(error.message, 'error'));
    }
    console.log(err);
  }
};

export const updatePet = (id, formData, token) => async (dispatch) => {
  try {
    const res = await api.updatePet(id, formData, token);
    console.log(res);
    if (res.status === 200) {
      const profile = await api.getProfileInfo(res.data.data.owner);
      if (profile.status === 200) {
        dispatch({ type: USER_PROFILE, payload: profile.data });
        dispatch(setAlert(res.data.message, 'success'));
      }
    }

    console.log(res);
  } catch (error) {}
};

export const getPetInfo = (id) => async (dispatch) => {
  try {
    const res = await api.getPetInfo(id);
    if (res.status === 200) {
      console.log(res);
      dispatch({ type: GET_PET_INFO, payload: res.data.data });
      dispatch(setAlert(res.data.message, 'success'));
    }
  } catch (err) {}
};

export const deletPet = (id) => async (dispatch) => {
  try {
    const res = await api.deletePet(id);
    if (res.status === 200) {
      console.log(res.data);
      dispatch({ type: DELETE_PET, payload: res.data });
    }
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
