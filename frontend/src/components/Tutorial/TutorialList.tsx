"use client";

import React from 'react';
import { List, Box, Typography } from '@mui/material';
import TutorItem from '../Tutor/TutorItem';
import { tutorProps } from '@/interfaces/tutor.interface';

interface TutorListProps {
  tutors: tutorProps[];
  selectedTutor: tutorProps;
  handleTutorClick: (tutor: tutorProps) => void;
}

const TutorList: React.FC<TutorListProps> = ({ tutors, selectedTutor, handleTutorClick }) => {
  return (
    <List>
      {tutors.length > 0 ? (
        tutors.map((tutor, index) => (
          <TutorItem
            key={index}
            tutor={tutor}
            index={index}
            selected={selectedTutor.id === tutor.id}
            onClick={() => handleTutorClick(tutor)}
          />
        ))
      ) : (
        <Box sx={{ textAlign: 'center', mt: 'auto', mb: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', marginTop: 20 }}>
          <Typography variant="h6">Usuário não encontrando</Typography>
        </Box>
      )}
    </List>
  );
};

export default TutorList;