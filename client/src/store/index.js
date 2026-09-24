import { configureStore } from '@reduxjs/toolkit';
import phonesReducer from './slices/phonesSlice';
import notificationReducer from './slices/notificationSlice';

const store = configureStore({
  reducer: {
    phones: phonesReducer,
    notification: notificationReducer,
  },
});

export default store;
