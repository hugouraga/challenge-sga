"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { Box, Stack, Pagination, Typography } from '@mui/material';
import TutorItem from './Tutor';
import { tutorProps } from '@/interfaces/tutor.interface';

interface Props {
  filteredTutors: tutorProps[];
  selectedTutor: tutorProps | null;
  handleTutorClick: (tutor: tutorProps) => void;
}

const TutorList: React.FC<Props> = ({ filteredTutors, handleTutorClick, selectedTutor }) => {
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 6;

  const handleChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    []
  );

  const tutorList = useMemo(
    () => filteredTutors.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [filteredTutors, page]
  );

  const totalPages = useMemo(() => Math.ceil(filteredTutors.length / itemsPerPage), [filteredTutors]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '0',
        overflowX: 'auto',
      }}
    >
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        {tutorList.length > 0 ? (
          tutorList.map((tutor, index) => (
            <TutorItem
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
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              mt: 12,
              mb: 12,
            }}
          >
            <Typography variant="h6">Nenhum usuário identificado</Typography>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          textAlign: 'center',
          mt: 2,
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
    </Box>
  );
};

export default TutorList;