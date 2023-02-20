import { TokenOutlined } from '@mui/icons-material';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000/' });

const sourse = axios.CancelToken.source();

/*  const headers = {
  headers: { Authorization: `Token ${token}` },
};  */
const headers = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};
const config = {
  CancelToken: sourse.token,
};

export const getUserInfo = (token) =>
  API.get(`api-auth-djoser/users/me/`, {
    headers: { Authorization: 'Token '.concat(token) },
  });
export const getProfileInfo = (id, token) =>
  API.get(`api/profiles/${id}/`, {
    headers: {
      Authorization: 'Token '.concat(token),
      'Content-Type': 'multipart/form-data',
    },
  });

export const signin = (formData) =>
  API.post(`api-auth-djoser/token/login/`, formData, config);

export const signup = (formData) =>
  API.post(`api-auth-djoser/users/`, formData, config);

export const createPet = (formData) =>
  API.post('api/listings/create/', formData, config);

export const updatePet = (id, formData, token) =>
  API.patch(`api/listings/update/${id}/`, formData, {
    headers: {
      Authorization: 'Token '.concat(token),
      'Content-Type': 'multipart/form-data',
    },
  });

export const logout = (token) =>
  API.post(`api-auth-djoser/token/logout/`, token, {
    headers: { Authorization: 'Token '.concat(token) },
  });
export const deletePet = (id) =>
  API.delete(`api/listings/delete/${id}/`, config);

export const updateMe = (id, formData, token) =>
  API.patch(`api/user/profile/${id}/`, formData, {
    headers: { Authorization: 'Token '.concat(token) },
  });

export const getPetInfo = (id) => API.get(`api/listings/info/${id}/`);
