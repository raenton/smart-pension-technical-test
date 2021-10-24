import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { actions as errorActions } from '../ErrorOverlay/app';
import api from '../../api';

const APP_NAME = 'weblog_inspector';

const slice = createSlice({
  name: APP_NAME,
  initialState: {

  }
});

