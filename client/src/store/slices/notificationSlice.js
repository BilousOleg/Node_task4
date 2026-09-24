import { createSlice } from '@reduxjs/toolkit';

const NOTIFICATION_SLICE_NAME = 'notification';

const initialState = {
  message: '',
  type: '',
  isVisible: false,
};

const notificationSlice = createSlice({
  initialState,
  name: NOTIFICATION_SLICE_NAME,
  reducers: {
    showNotification: (state, { payload: { message, type } }) => {
      state.message = message;
      state.type = type;
      state.isVisible = true;
    },

    hideNotification: state => {
      state.message = '';
      state.type = '';
      state.isVisible = false;
    },
  },
});

const { reducer, actions } = notificationSlice;

export const { showNotification, hideNotification } = actions;

export default reducer;
