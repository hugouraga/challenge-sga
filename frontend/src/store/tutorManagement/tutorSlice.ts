import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tutorProps } from '@/interfaces/tutor.interface';
import { fetchTutors } from './thunks';

interface TutorManagementState {
  users: tutorProps[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  page: number;
  totalPages: number;
}

const initialState: TutorManagementState = {
  users: [],
  loading: false,
  error: null,
  searchQuery: '',
  page: 1,
  totalPages: 0,
};

const tutorSlice = createSlice({
  name: 'tutorManagement',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTutors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTutors.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.users = action.payload.users;
        state.page = parseInt(String(action.payload.page), 10);
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTutors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tutors';
      });
  },
});

export const { setSearchQuery } = tutorSlice.actions;
export default tutorSlice.reducer;