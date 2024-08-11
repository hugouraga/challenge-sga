import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tutorialInterface } from '@/interfaces/tutorial.interta';
import {
  fetchPaginatedTutorials,
  createTutorial,
  editTutorial,
  deleteTutorial,
} from './thunks';

interface TutorialManagementState {
  tutorials: tutorialInterface[];
  tutorialsByTutorId: { [key: string]: tutorialInterface[] };
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const initialState: TutorialManagementState = {
  tutorials: [],
  tutorialsByTutorId: {},
  loading: false,
  error: null,
  page: 1,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

const tutorialSlice = createSlice({
  name: 'tutorialManagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaginatedTutorials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPaginatedTutorials.fulfilled, (state, action: PayloadAction<{ tutorials: tutorialInterface[]; page: number; totalPages: number; hasNextPage: boolean; hasPreviousPage: boolean; }>) => {
        state.loading = false;
        const { tutorials, page, totalPages, hasNextPage, hasPreviousPage } = action.payload;
        state.tutorials = tutorials;
        state.page = page;
        state.totalPages = totalPages;
        state.hasNextPage = hasNextPage;
        state.hasPreviousPage = hasPreviousPage;
      })
      .addCase(fetchPaginatedTutorials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch paginated tutorials';
      })
      .addCase(createTutorial.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTutorial.fulfilled, (state, action: PayloadAction<tutorialInterface>) => {
        state.loading = false;
        const newTutorial = action.payload;
        const tutorId = newTutorial.creatorId;
        if (!tutorId) return;
        state.tutorialsByTutorId[tutorId] = state.tutorialsByTutorId[tutorId]
          ? [...state.tutorialsByTutorId[tutorId], newTutorial]
          : [newTutorial];
      })
      .addCase(createTutorial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create tutorial';
      })
      .addCase(editTutorial.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTutorial.fulfilled, (state, action: PayloadAction<tutorialInterface>) => {
        state.loading = false;
        const updatedTutorial = action.payload;
        const tutorId = updatedTutorial.creatorId;
        if (!tutorId) return;
        const index = state.tutorialsByTutorId[tutorId]?.findIndex(t => t.id === updatedTutorial.id);
        if (index !== -1 && index !== undefined) {
          state.tutorialsByTutorId[tutorId][index] = updatedTutorial;
        }
      })
      .addCase(editTutorial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to edit tutorial';
      })
      .addCase(deleteTutorial.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTutorial.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        for (const tutorId in state.tutorialsByTutorId) {
          state.tutorialsByTutorId[tutorId] = state.tutorialsByTutorId[tutorId].filter(t => t.id !== id);
        }
      })
      .addCase(deleteTutorial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete tutorial';
      });
  },
});

export default tutorialSlice.reducer;