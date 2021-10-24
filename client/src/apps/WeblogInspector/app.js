import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

const APP_NAME = 'weblog_inspector';

const submitWeblog = createAsyncThunk(
  `${APP_NAME}/submit_weblog`,
  async ({
    formData,
    unique,
    sortOrder
  }, {
    rejectWithValue
  }) => {
    try {
      const response = await api.weblogService.submitWeblog(formData, unique, sortOrder);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

const slice = createSlice({
  name: APP_NAME,
  initialState: {
    logReport: {},
    error: '',
  },
  extraReducers: {
    [submitWeblog.pending]: (state) => {
      state.logReport = {};
      state.error = '';
    },
    [submitWeblog.fulfilled]: (state, action) => {
      state.logReport = action.payload;
    },
    [submitWeblog.rejected]: (state, action) => {
      state.error = action.payload.message;
    }
  }
});

export const actions = {
  ...slice.actions,
  submitWeblog
};

export default slice.reducer;