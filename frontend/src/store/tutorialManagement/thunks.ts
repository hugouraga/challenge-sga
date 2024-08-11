import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchParams } from '@/components/Tables/TableTutorials';
import { TutorialPaginatedResponse } from '@/interfaces/paginated.interface';
import { tutorialInterface } from '@/interfaces/tutorial.interta';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const fetchPaginatedTutorials = createAsyncThunk(
  'contentManagement/fetchPaginatedTutorials',
  async ({ page = 1, rowsPerPage = 10, filters = {} }: fetchParams) => {
    const queryParams = new URLSearchParams({
      ...(filters?.title && { title: filters.title }),
      ...(filters?.difficultyLevel && { difficultyLevel: filters.difficultyLevel }),
      ...(filters?.duration && { duration: filters.duration }),
      offset: ((page - 1) * rowsPerPage).toString(),
      limit: rowsPerPage.toString(),
    });

    const response = await fetch(`${API_URL}/tutorials/list?${queryParams.toString()}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error('Failed to fetch paginated tutorials');
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
    const response = await fetch(`${API_URL}/tutorial/new`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(tutorial),
    });
    if (!response.ok) throw new Error('Failed to create tutorial');
    return response.json();
  }
);

export const editTutorial = createAsyncThunk(
  'contentManagement/editTutorial',
  async (tutorial: Partial<tutorialInterface> & { id: string }) => {
    const { id, ...tutorialWithoutId } = tutorial;
    const response = await fetch(`${API_URL}/tutorial/edit/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(tutorialWithoutId),
    });

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
    const response = await fetch(`${API_URL}/tutorial/delete/${tutorialId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error('Erro ao excluir tutorial');

    return { id: tutorialId };
  }
);

export const fetchTutorialsByCreatorId = createAsyncThunk(
  'contentManagement/fetchTutorialsByCreatorId',
  async ({ creatorId }: { creatorId: string }) => {
    const response = await fetch(`${API_URL}/tutorials/list/${creatorId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch tutorials');
    const tutorials = await response.json();
    console.log('esse console é da storage do redux' ,creatorId, tutorials )
    return { creatorId, tutorials };
  }
);