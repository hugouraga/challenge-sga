import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const fetchTutors = createAsyncThunk(
  'contentManagement/fetchTutors',
  async ({ page, query }: { page: number; query: string }) => {
    const response = await fetch(`${API_URL}/users/list?page=${page}&query=${query}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch tutors');
    return response.json();
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
    return { creatorId, tutorials };
  }
);