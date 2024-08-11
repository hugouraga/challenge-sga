import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { tutorProps } from '@/interfaces/tutor.interface';
import debounce from 'debounce';
import { tutorialInterface } from '@/interfaces/tutorial.interta';
import { fetchTutorialsByCreatorId, fetchTutors } from '@/store/tutorManagement/thunks';
import { setSearchQuery } from '@/store/tutorManagement/tutorSlice';
import { fetchPaginatedTutorials } from '@/store/tutorialManagement/thunks';

export const useFetchTutors = () => {
  const dispatch = useAppDispatch();

  // Seletores para tutorManagement e tutorialManagement
  const { users, loading, page, searchQuery } = useAppSelector(
    (state) => state.tutorManagement
  );

  const { tutorialsByTutorId, tutorials } = useAppSelector(
    (state) => state.tutorialManagement
  );

  useEffect(() => {
    dispatch(fetchTutors({ page, query: searchQuery }));
  }, [dispatch, page, searchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleTutorClick = debounce((tutor: tutorProps) => {
    if (!tutorialsByTutorId[tutor.id]) {
      dispatch(fetchTutorialsByCreatorId({ creatorId: tutor.id }));
    }
  }, 300);

  const fetchPaginatedData = async ({ filters }: any): Promise<tutorialInterface[]> => {
    const result = await dispatch(fetchPaginatedTutorials(filters)).unwrap();
    return result.tutorials;
  };

  return {
    users,
    loading,
    searchQuery,
    handleSearchChange,
    handleTutorClick,
    tutorialsByTutorId,
    tutorials,
    fetchPaginatedData,
  };
};