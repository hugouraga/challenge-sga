import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTutors, setSearchQuery, fetchTutorTutorials } from '@/store/appDataSlice/appDataSlice';
import { tutorProps } from '@/interfaces/tutor.interface';
import debounce from 'debounce';

export const useFetchTutors = () => {
  const dispatch = useAppDispatch();
  const { users, loading, page, searchQuery, tutorialsByTutorId } = useAppSelector(
    (state) => state.tutors
  );

  useEffect(() => {
    dispatch(fetchTutors({ page, query: searchQuery }));
  }, [dispatch, page, searchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleTutorClick = debounce((tutor: tutorProps) => {
    if (!tutorialsByTutorId[tutor.id]) {
      dispatch(fetchTutorTutorials(tutor.id));
    }
  }, 300);

  return {
    users,
    loading,
    searchQuery,
    handleSearchChange,
    handleTutorClick,
    tutorialsByTutorId
  };
};