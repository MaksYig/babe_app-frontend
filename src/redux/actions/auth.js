import * as api from '../../API/index';
import {
  ISUSER,
  NOUSER,
  USER_SIGNIN,
  USER_SIGNIN_FAIL,
  USER_PROFILE,
  USER_PROFILE_FAIL,
  USER_CREATED,
  USER_CREATED_FAIL,
  USER_UPDATED,
  USER_UPDATED_FAIL,
  SIGN_OUT,
} from './types';
import { setAlert } from './alert';
//Action creator
/* SIgnin * 3 */
export const login = (formData) => async (dispatch) => {
  try {
    const res = await api.signin(formData);
    if (res.status === 200) {
      console.log(res);
      dispatch({ type: USER_SIGNIN, payload: res.data });
      const info = await api.getUserInfo(res.data?.auth_token);
      localStorage.setItem('auth_token', res?.data?.auth_token);
      if (info.status === 200) {
        const token = await localStorage.getItem('auth_token');
        dispatch({ type: ISUSER, payload: info?.data });
        console.log(info);
        const prof = await api.getProfileInfo(info?.data?.id, token);
        if (prof.status === 200) {
          dispatch({ type: USER_PROFILE, payload: prof.data });
          console.log(prof);
        }
      }
    }
  } catch (err) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: err.response.data,
    });
    dispatch(setAlert(err.response.data?.errors, 'error'));
    console.log(err.response.data);
  }
};

export const getUser = (token) => async (dispatch) => {
  try {
    const res = await api.getUserInfo(token);

    if (res.status === 200) {
      dispatch({ type: ISUSER, payload: res?.data });
      console.log(res);
    }
  } catch (error) {
    dispatch({ type: NOUSER, payload: error.response?.data });
    console.log(error);
  }
};

export const signup = (formData) => async (dispatch) => {
  try {
    const res = await api.signup(formData);
    console.log(res);
    if (res.status === 201) {
      dispatch({ type: USER_CREATED, payload: res?.data });
      dispatch(setAlert('Successfully created user', 'success'));
      console.log(res);
      const sign = await api.signin(formData);
      if (sign.status == 200) {
        dispatch({ type: USER_SIGNIN, payload: sign.data });
        console.log(res);
        const info = await api.getUserInfo(sign.data?.auth_token);
        localStorage.setItem('auth_token', sign.data?.auth_token);
        if (info.status === 200) {
          dispatch({ type: ISUSER, payload: info.data });
          console.log(info);
          const prof = await api.getProfileInfo(info.data?.id);
          if (prof.status === 200) {
            dispatch({ type: USER_PROFILE, payload: prof.data });
            console.log(prof);
          }
        }
      }
    }
  } catch (err) {
    const error = err.response.data;
    if (error) {
      // dispatch({type:USER_CREATED_FAIL, payload:error})
      dispatch(setAlert(error.errors[0], 'error'));
    }
  }
};

export const updateMe = (id, formData, token) => async (dispatch) => {
  try {
    const res = await api.updateMe(id, formData, token);
    if (res.status == 200) {
      dispatch({ type: USER_UPDATED, payload: res.data.data });
      const prof = await api.getProfileInfo(res.data.data.id);
      dispatch({ type: USER_PROFILE, payload: prof.data });
    }
    dispatch(setAlert(res.data.message, 'success'));
    console.log(res);
  } catch (err) {
    const error = err.response.data;
    dispatch({ type: USER_UPDATED_FAIL, payload: error.message });
    if (error) {
      dispatch(setAlert(error.detail, 'error'));
    }
  }
};

export const signout = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('auth_token');
    const res = await api.logout(token);
    console.log(res);
    if (res.status === 204) {
      localStorage.removeItem('auth_token');
      dispatch({ type: SIGN_OUT, payload: res.data });
      console.log(res);
    }
  } catch (error) {
    dispatch({ type: NOUSER, payload: error.response?.data });
    console.log(error);
  }
};
