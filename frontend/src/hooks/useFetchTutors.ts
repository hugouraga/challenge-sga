import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTutors, setSearchQuery, fetchTutorialsByCreatorId, fetchPaginatedTutorials } from '@/store/appDataSlice/appDataSlice';
import { tutorProps } from '@/interfaces/tutor.interface';
import debounce from 'debounce';
import { fetchParams } from '@/components/Tables/TableTutorials';
import { tutorialInterface } from '@/interfaces/tutorial.interta';

export const useFetchTutors = () => {
  const dispatch = useAppDispatch();
  const { users, loading, page, searchQuery, tutorialsByTutorId, tutorials } = useAppSelector(
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
      dispatch(fetchTutorialsByCreatorId({ creatorId: tutor.id }));
    }
  }, 300);

  const fetchPaginatedData = async ({filters}: any): Promise<tutorialInterface[]> => {
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