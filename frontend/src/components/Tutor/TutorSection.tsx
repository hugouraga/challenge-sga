import React from 'react';
import { Box, Typography, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { tutorProps } from '@/interfaces/tutor.interface';
import styles from './TutorSection.module.css';
import PaginatedTutors from './TutorList';

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
      <Box
        className={styles.searchBox}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography
          fontSize={{ xs: 24, sm: 30 }}
          fontWeight={700}
          sx={{ mb: { xs: 2, sm: 0 } }}
        >
          Lista de tutores
        </Typography>
        <Box
          className={styles.searchInput}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <SearchIcon />
          <InputBase
            placeholder="Buscar..."
            value={searchQuery}
            onChange={handleSearchChangeWithReset}
            sx={{
              marginLeft: 1,
              flex: 1,
              width: { xs: '100%', sm: 'auto' },
            }}
          />
        </Box>
      </Box>

      <PaginatedTutors
        filteredTutors={filteredTutors}
        handleTutorClick={handleTutorClick}
        selectedTutor={selectedTutor}
      />
    </>
  );
};

export default TutorSection;