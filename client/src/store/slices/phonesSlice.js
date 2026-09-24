import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from './../../api';

const PHONES_SLICE_NAME = 'phones';

const initialState = {
  phones: [],
  phone: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  isFetching: false,
  error: null,
};

export const createPhoneThunk = createAsyncThunk(
  `${PHONES_SLICE_NAME}/create`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.createPhone(payload);

      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const getPhonesThunk = createAsyncThunk(
  `${PHONES_SLICE_NAME}/get`,
  async ({ page, results }, { rejectWithValue }) => {
    try {
      const {
        data: { data, pagination },
      } = await API.getPhones(page, results);

      return { data, pagination };
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const getPhoneByIdThunk = createAsyncThunk(
  `${PHONES_SLICE_NAME}/getById`,
  async (id, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getPhoneById(id);

      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const updatePhoneThunk = createAsyncThunk(
  `${PHONES_SLICE_NAME}/update`,
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const {
        data: { data: updatedPhone },
      } = await API.updatePhone(id, data);

      return updatedPhone;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const deletePhoneThunk = createAsyncThunk(
  `${PHONES_SLICE_NAME}/delete`,
  async (payload, { rejectWithValue }) => {
    try {
      await API.deletePhone(payload);

      return payload;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

const phonesSlice = createSlice({
  initialState,
  name: PHONES_SLICE_NAME,

  extraReducers: builder => {
    // get phones
    builder.addCase(getPhonesThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });

    builder.addCase(
      getPhonesThunk.fulfilled,
      (state, { payload: { data, pagination } }) => {
        state.phones = data;
        state.pagination = pagination;
        state.isFetching = false;
      }
    );

    builder.addCase(getPhonesThunk.rejected, (state, { payload: { data } }) => {
      state.error = data;
      state.isFetching = false;
    });

    // get phone by id
    builder.addCase(getPhoneByIdThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
      state.phone = null;
    });

    builder.addCase(getPhoneByIdThunk.fulfilled, (state, { payload }) => {
      state.phone = payload;
      state.isFetching = false;
    });

    builder.addCase(getPhoneByIdThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    // create
    builder.addCase(createPhoneThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });

    builder.addCase(createPhoneThunk.fulfilled, (state, { payload }) => {
      state.phones.push(payload);
      state.isFetching = false;
    });

    builder.addCase(createPhoneThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    // update
    builder.addCase(updatePhoneThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });

    builder.addCase(updatePhoneThunk.fulfilled, (state, { payload }) => {
      state.phones = state.phones.map(phone =>
        phone.id === payload.id ? payload : phone
      );

      state.phone = payload;
      state.isFetching = false;
    });

    builder.addCase(updatePhoneThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    // delete
    builder.addCase(deletePhoneThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });

    builder.addCase(deletePhoneThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.phones = state.phones.filter(phone => phone.id !== payload);
    });

    builder.addCase(deletePhoneThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });
  },
});

const { reducer } = phonesSlice;

export default reducer;
