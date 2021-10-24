import { configureStore } from '@reduxjs/toolkit';
import weblogReducer from '../apps/WeblogInspector/app';

export const store = configureStore({
  reducer: {
    weblog: weblogReducer
  },
});
