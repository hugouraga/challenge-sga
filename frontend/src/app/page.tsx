"use client";
import React, { useCallback, useMemo, useState } from "react";
import { CssBaseline, Grid } from "@mui/material";
import styles from "./page.module.css";
import Header from "@/components/Header";
import TutorialModal from "@/components/Modals/ModalTutorial";
import { useFetchTutors } from "@/hooks/useFetchTutors";
import { tutorProps } from "@/interfaces/tutor.interface";
import withAuth from "@/hoc/withAuth";
import TableTutorial from "@/components/Tables/TableTutorials";
import TutorSection from "@/components/Tutor/TutorSection";
import Aside from "@/components/Aside/Aside";

const Home: React.FC = () => {
  const {
    users,
    loading,
    searchQuery,
    handleSearchChange,
    handleTutorClick,
    tutorialsByTutorId,
  } = useFetchTutors();

  const [selectedTutor, setSelectedTutor] = useState<tutorProps>({} as tutorProps);
  const [loadingSwitchingTutor, setLoadingSwitchingTutor] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<"tutores" | "tutoriais">("tutores");

  const handleSelect = useCallback(
    (tutor: tutorProps) => {
      if (tutor?.id === selectedTutor.id) return;
      setLoadingSwitchingTutor(true);
      setSelectedTutor(tutor);
      handleTutorClick(tutor);
    },
    [handleTutorClick, selectedTutor.id]
  );

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleSearchChangeWithReset = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (selectedTutor) {
        setSelectedTutor({} as tutorProps);
      }
      handleSearchChange(event);
    },
    [handleSearchChange, selectedTutor]
  );

  const filteredTutors = useMemo(
    () => users?.filter((tutor) =>
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [users, searchQuery]
  );

  const visibleTutorials = useMemo(() => {
    setLoadingSwitchingTutor(false);
    return selectedTutor ? tutorialsByTutorId[selectedTutor.id] || [] : [];
  }, [selectedTutor, tutorialsByTutorId]);

  return (
    <>
      <main className={styles.main}>
        <CssBaseline />
        <Grid container className={styles.gridContainer}>
          <Header onMenuClick={setCurrentScreen} />
          {currentScreen === "tutores" ? (
            <>
              <Grid item xs={12} md={7.5} className={styles.gridItem}>
                <TutorSection
                  searchQuery={searchQuery}
                  handleSearchChangeWithReset={handleSearchChangeWithReset}
                  filteredTutors={filteredTutors}
                  handleTutorClick={handleSelect}
                  selectedTutor={selectedTutor}
                />
              </Grid>
              <Grid item xs={12} md={4} className={styles.gridItem}>
                <Aside
                  tutorials={visibleTutorials}
                  loading={loading}
                  selectedTutor={selectedTutor}
                  loadingSwitchingTutor={loadingSwitchingTutor}
                  onOpen={handleOpen}
                />
              </Grid>
            </>
          ) : (
            <TableTutorial />
          )}
        </Grid>
      </main>
      <TutorialModal open={open} handleClose={handleClose} selectedTutor={selectedTutor} />
    </>
  );
};

export default withAuth(Home);