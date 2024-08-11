import { configureStore } from '@reduxjs/toolkit';
import tutorReducer from '@/store/tutorManagement';
import tutorialReducer from '@/store/tutorialManagement';

const store = configureStore({
  reducer: {
    tutorManagement: tutorReducer,
    tutorialManagement: tutorialReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;