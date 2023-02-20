import { configureStore } from '@reduxjs/toolkit';
import auth from '../src/redux/reducers/auth';
import alert from '../src/redux/reducers/alert';
import pet from '../src/redux/reducers/pet';

export const store = configureStore({
  reducer: {
    auth: auth,
    alert: alert,
    pet: pet,
  },
});
