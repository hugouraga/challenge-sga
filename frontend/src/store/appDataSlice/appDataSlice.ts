import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { tutorProps } from '@/interfaces/tutor.interface';
import { tutorialInterface } from '@/interfaces/tutorial.interta';
import { fetchParams } from '@/components/Tables/TableTutorials';
import { TutorialPaginatedResponse } from '@/interfaces/paginated.interface';

interface ContentManagementState {
  users: tutorProps[];
  tutorials: tutorialInterface[];
  tutorialsByTutorId: { [key: string]: tutorialInterface[] };
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
  tutorials: [],
  tutorialsByTutorId: {},
  loading: false,
  error: null,
  searchQuery: '',
  page: 1,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

export const fetchTutors = createAsyncThunk(
  'contentManagement/fetchTutors',
  async ({ page, query }: { page: number; query: string }) => {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'}/users/list?page=${page}&query=${query}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.json();
  }
);

export const fetchTutorialsByCreatorId = createAsyncThunk(
  'contentManagement/fetchTutorialsByCreatorId',
  async ({ creatorId }: { creatorId: string }) => {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'}/tutorials/list/${creatorId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const tutorials = await response.json();
    return { creatorId, tutorials };
  }
);

export const fetchPaginatedTutorials = createAsyncThunk(
  'contentManagement/fetchPaginatedTutorials',
  async ({ page = 1, rowsPerPage = 10, filters = {} }: fetchParams) => {
    const token = localStorage.getItem('token');
    const queryParams = new URLSearchParams({
      ...(filters?.title && { title: filters.title }),
      ...(filters?.difficultyLevel && { difficultyLevel: filters.difficultyLevel }),
      ...(filters?.duration && { duration: filters.duration }),
      offset: ((page - 1) * rowsPerPage).toString(),
      limit: rowsPerPage.toString(),
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'}/tutorials/list?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data: TutorialPaginatedResponse = await response.json();

    return {
      tutorials: data.tutorials,
      total: data.total,
      page: data.page,
      totalPages: data.totalPages,
      hasNextPage: data.hasNextPage,
      hasPreviousPage: data.hasPreviousPage,
    };
  }
);

export const createTutorial = createAsyncThunk(
  'contentManagement/createTutorial',
  async (tutorial: tutorialInterface) => {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'}/tutorial/new`,
      {
        method: 'POST',
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

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(errorDetails.message || 'Erro ao atualizar tutorial');
    }

    return response.json();
  }
);

export const deleteTutorial = createAsyncThunk(
  'contentManagement/deleteTutorial',
  async (tutorialId: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'}/tutorial/delete/${tutorialId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Erro ao excluir tutorial');
    }

    return {
      id: tutorialId
    };
  }
);
export const editUser = createAsyncThunk(
  'contentManagement/editUser',
  async (tutorial: tutorProps) => {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'}/tutorials/update`,
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
      .addCase(fetchTutorialsByCreatorId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTutorialsByCreatorId.fulfilled, (state, action: PayloadAction<{ creatorId: string | undefined; tutorials: tutorialInterface[] }>) => {
        state.loading = false;
        const { creatorId, tutorials } = action.payload;
        if (creatorId) {
          state.tutorialsByTutorId[creatorId] = tutorials;
        } else {
          console.error('Received undefined creatorId. Tutorials will not be stored.');
        }
      })
      .addCase(fetchTutorialsByCreatorId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tutorials for tutor';
      })
      .addCase(createTutorial.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTutorial.fulfilled, (state, action: PayloadAction<tutorialInterface>) => {
        state.loading = false;
        const newTutorial = action.payload;
        const tutorId = newTutorial.creatorId;
        if (!tutorId) return;
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
      .addCase(editTutorial.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTutorial.fulfilled, (state, action: PayloadAction<tutorialInterface>) => {
        state.loading = false;
        const updatedTutorial = action.payload;
        const tutorId = updatedTutorial.creatorId;
        if (!tutorId) return;
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
      .addCase(fetchPaginatedTutorials.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPaginatedTutorials.fulfilled, (state, action: PayloadAction<{ tutorials: tutorialInterface[]; total: number; page: number; totalPages: number; hasNextPage: boolean; hasPreviousPage: boolean; }>) => {
        state.loading = false;
        const { tutorials, total, page, totalPages, hasNextPage, hasPreviousPage } = action.payload;
        state.tutorials = tutorials;
        state.page = page;
        state.totalPages = totalPages;
        state.hasNextPage = hasNextPage;
        state.hasPreviousPage = hasPreviousPage;
      })
      .addCase(fetchPaginatedTutorials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch paginated tutorials';
      });
  },
});

export const { setSearchQuery, incrementPage } = contentManagementSlice.actions;
export default contentManagementSlice.reducer;