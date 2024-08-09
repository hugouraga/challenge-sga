"use client";

import styles from "./page.module.css";
import {
  Box,
  CssBaseline,
  Grid,
  List,
  Typography,
  Button,
  InputBase,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Aside from "@/components/Aside";
import { Key, SetStateAction, useState } from "react";
import SkeletonTutorial from "@/components/Skeletons/SkeletonTutorial";
import Header from "@/components/Header";
import { Colors } from "@/theme/colors";
import TutorialModal from "@/components/Modals/ModalTutorial";
import TutorsList from "@/components/paginatedTutors";
import { useAuth } from "@/context/AuthContext";
import Tutorial from "@/components/Tutorial";
import { useFetchTutors } from '@/hooks/useFetchTutors';
import { tutorProps } from "@/interfaces/tutor.interface";
import { tutorialInterface } from "@/interfaces/tutorial.interta";
import withAuth from "@/hoc/withAuth";

const Home: React.FC = () => {
  const { user } = useAuth();
  const { users, loading, searchQuery, handleSearchChange, handleTutorClick, tutorialsByTutorId } = useFetchTutors();
  const [selectedTutor, setSelectedTutor] = useState<tutorProps>({} as tutorProps);
  const [open, setOpen] = useState(false);

  const handleSelect = (tutor: tutorProps) => {
    setSelectedTutor(tutor);
    handleTutorClick(tutor);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredTutors = users?.filter((tutor: { name: string; }) =>
    tutor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleTutorials = selectedTutor ? tutorialsByTutorId[selectedTutor.id] || [] : [];
  return (
    <>
      <main className={styles.main}>
        <CssBaseline />
        <Grid
          container
          className={styles.gridContainer}
        >
          <Header />
          <Grid
            item
            xs={12}
            md={7.5}
            className={styles.gridItem}
          >
            <Box className={styles.searchBox}>
              <Typography fontSize={30} fontWeight={700}>
                Lista de tutores
              </Typography>
              <Box className={styles.searchInput}>
                <SearchIcon />
                <InputBase
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={{ marginLeft: 1, flex: 1 }}
                />
              </Box>
            </Box>

            <TutorsList
              filteredTutors={filteredTutors}
              handleTutorClick={handleSelect}
              selectedTutor={selectedTutor}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            className={styles.gridItem}
          >
            <Aside>
              <List>
                {loading ? (
                  <SkeletonTutorial />
                ) : selectedTutor.id && visibleTutorials.length === 0 ? (
                  <Box className={styles.noTutorialsBox}>
                    <Typography variant="subtitle1">
                      Sem tutoriais cadastrados para esse usuário
                    </Typography>
                  </Box>
                ) : (
                  visibleTutorials.map((tutorial: any) => (
                    <Tutorial
                      key={tutorial.id}
                      id={tutorial.id}
                      hours={tutorial.estimatedDuration}
                      title={tutorial.title}
                      description={tutorial.summary}
                      category={tutorial.difficultyLevel}
                    />
                  ))
                )}

                {selectedTutor.id ? (
                  <Box className={styles.noTutorialsBox}>
                    <Button
                      variant="contained"
                      color={loading ? 'info' : 'warning'}
                      sx={{ mt: 3, boxShadow: 0, border: 0 }}
                      onClick={handleOpen}
                      disabled={loading}
                    >
                      Registrar tutorial
                    </Button>
                  </Box>
                ) : (
                  <Box className={styles.noTutorialsBox}>
                    <Typography variant="subtitle1">
                      Selecione um tutor ao lado para visualizar as tutorias associadas a ele
                    </Typography>
                  </Box>
                )}
              </List>
            </Aside>
          </Grid>
        </Grid>
      </main>

      <TutorialModal open={open} handleClose={handleClose} selectedTutor={selectedTutor} />
    </>
  );
}

export default withAuth(Home)