"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { Box, Stack, Pagination, Typography } from '@mui/material';
import TutorialItem from './Tutor/TutorItem';
import { tutorProps } from '@/interfaces/tutor.interface';

interface Props {
  filteredTutors: tutorProps[];
  selectedTutor: tutorProps | null;
  handleTutorClick: (tutor: tutorProps) => void;
}

const TutorsList: React.FC<Props> = ({ filteredTutors, handleTutorClick, selectedTutor }) => {
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 6;

  const handleChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    []
  );

  const paginatedTutors = useMemo(
    () => filteredTutors?.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [filteredTutors, page]
  );

  const totalPages = useMemo(() => Math.ceil(filteredTutors.length / itemsPerPage), [filteredTutors]);

  return (
    <>
      {paginatedTutors?.length > 0 ? (
        paginatedTutors.map((tutor, index) => (
          <TutorialItem
            key={tutor.id}
            tutor={tutor}
            index={index}
            selected={selectedTutor?.id === tutor.id}
            onClick={() => handleTutorClick(tutor)}
          />
        ))
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            mt: 'auto',
            mb: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            marginTop: -12,
          }}
        >
          <Typography variant="h6">Nenhum usuário identificado</Typography>
        </Box>
      )}

      <Box
        sx={{
          textAlign: 'right',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          marginRight: 1,
          marginTop: 3,
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </Box>
    </>
  );
};

export default TutorsList;