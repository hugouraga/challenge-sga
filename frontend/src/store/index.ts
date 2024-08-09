import { configureStore } from '@reduxjs/toolkit';
import tutorsReducer from './appDataSlice/appDataSlice';

export const store = configureStore({
  reducer: {
    tutors: tutorsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
