import styles from '../../app/page.module.css';

import React from 'react';
import { Box, Typography, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { tutorProps } from '@/interfaces/tutor.interface';
import TutorsList from './PaginatedTutors';

interface TutorSectionProps {
  searchQuery: string;
  handleSearchChangeWithReset: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filteredTutors: tutorProps[];
  handleTutorClick: (tutor: tutorProps) => void;
  selectedTutor: tutorProps;
}

const TutorSection: React.FC<TutorSectionProps> = ({
  searchQuery,
  handleSearchChangeWithReset,
  filteredTutors,
  handleTutorClick,
  selectedTutor,
}) => {
  return (
    <>
      <Box className={styles.searchBox}>
        <Typography fontSize={30} fontWeight={700}>
          Lista de tutores
        </Typography>
        <Box className={styles.searchInput}>
          <SearchIcon />
          <InputBase
            placeholder="Buscar..."
            value={searchQuery}
            onChange={handleSearchChangeWithReset}
            sx={{ marginLeft: 1, flex: 1 }}
          />
        </Box>
      </Box>

      <TutorsList
        filteredTutors={filteredTutors}
        handleTutorClick={handleTutorClick}
        selectedTutor={selectedTutor}
      />
    </>
  );
};

export default TutorSection;