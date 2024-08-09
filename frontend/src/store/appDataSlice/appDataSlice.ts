import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { tutorProps } from '@/interfaces/tutor.interface';
import { tutorialInterface } from '@/interfaces/tutorial.interta';

export interface TutorialInterface {
  id: string;
  title: string;
  hours: number;
  description: string;
  category: string;
  summary?: string;
  estimatedDuration?: string;
  difficultyLevel?: string;
  creatorId?: string;
  createdAt?: string;
}


interface ContentManagementState {
  users: tutorProps[];
  tutorialsByTutorId: { [key: string]: TutorialInterface[] };
  loading: boolean;
  error: string | null;
  searchQuery: string;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const initialState: ContentManagementState = {
  users: [],
  tutorialsByTutorId: {},
  loading: false,
  error: null,
  searchQuery: '',
  page: 1,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

// Fetch Tutors
export const fetchTutors = createAsyncThunk(
  'contentManagement/fetchTutors',
  async ({ page, query }: { page: number; query: string }) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/tutors/fetch?page=${page}&query=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  }
);

// Fetch Tutorials for a Specific Tutor
export const fetchTutorTutorials = createAsyncThunk(
  'contentManagement/fetchTutorTutorials',
  async (creatorId: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/tutorials/fetch?creatorId=${creatorId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const tutorials = await response.json();
    return { creatorId, tutorials };
  }
);

// Create Tutorial
export const createTutorial = createAsyncThunk(
  'contentManagement/createTutorial',
  async (tutorial: tutorialInterface) => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/tutorials/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tutorial),
    });
    return response.json();   
  }
);

// Edit Tutorial
export const editTutorial = createAsyncThunk(
  'contentManagement/editTutorial',
  async (tutorial: any) => {
    const token = localStorage.getItem('token');
    const { id, ...tutorialWithoutId } = tutorial;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'}/tutorial/edit/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tutorialWithoutId),
      }
    );
    return response.json();
  }
);

// Delete Tutorial
export const deleteTutorial = createAsyncThunk(
  'contentManagement/deleteTutorial',
  async (tutorialId: string) => {
    const token = localStorage.getItem('token');
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'}${tutorialId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      id: tutorialId
    };
  }
);

// Edit User (Tutor)
export const editUser = createAsyncThunk(
  'contentManagement/editUser',
  async (tutorial: tutorProps) => {
    const token = localStorage.getItem('token');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'/tutorials/update`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tutorial),
      }
    );
    return response.json();
  }
);

const contentManagementSlice = createSlice({
  name: 'contentManagement',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    incrementPage(state) {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchTutors
      .addCase(fetchTutors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTutors.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.users = action.payload.users;
        state.page = parseInt(String(action.payload.page), 10);
        state.totalPages = action.payload.totalPages;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPreviousPage = action.payload.hasPreviousPage;
      })
      .addCase(fetchTutors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tutors';
      })
  
      // Handle fetchTutorTutorials
      .addCase(fetchTutorTutorials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTutorTutorials.fulfilled, (state, action: PayloadAction<{ creatorId: string; tutorials: TutorialInterface[] }>) => {
        state.loading = false;
        const { creatorId, tutorials } = action.payload;
        state.tutorialsByTutorId[creatorId] = tutorials;
      })
      .addCase(fetchTutorTutorials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tutorials for tutor';
      })
  
      // Handle createTutorial
      .addCase(createTutorial.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTutorial.fulfilled, (state, action: PayloadAction<TutorialInterface>) => {
        state.loading = false;
        const newTutorial = action.payload;
        const tutorId = newTutorial.creatorId;
        if(!tutorId) return;
        if (state.tutorialsByTutorId[tutorId]) {
          state.tutorialsByTutorId[tutorId].push(newTutorial);
        } else {
          state.tutorialsByTutorId[tutorId] = [newTutorial];
        }
      })
      .addCase(createTutorial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create tutorial';
      })
  
      // Handle editTutorial
      .addCase(editTutorial.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTutorial.fulfilled, (state, action: PayloadAction<TutorialInterface>) => {
        state.loading = false;
        const updatedTutorial = action.payload;
        const tutorId = updatedTutorial.creatorId;
        if(!tutorId) return;
        if (state.tutorialsByTutorId[tutorId]) {
          const index = state.tutorialsByTutorId[tutorId].findIndex(t => t.id === updatedTutorial.id);
          if (index !== -1) {
            state.tutorialsByTutorId[tutorId][index] = updatedTutorial;
          }
        }
      })
      .addCase(editTutorial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to edit tutorial';
      })
  
      // Handle deleteTutorial
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
      })
  
      // Handle editUser
      .addCase(editUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<tutorProps>) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to edit user';
      });
  }
});

export const { setSearchQuery, incrementPage } = contentManagementSlice.actions;
export default contentManagementSlice.reducer;