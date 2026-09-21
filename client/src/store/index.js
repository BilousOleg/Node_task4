import { configureStore } from '@reduxjs/toolkit';
import phonesReducer from './slices/phonesSlice';

const store = configureStore({
  reducer: {
    phones: phonesReducer,
  },
});

export default store;
