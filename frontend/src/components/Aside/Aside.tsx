"use client";

import React from "react";
import { Box, Typography, Button, CircularProgress, List } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tutorProps } from "@/interfaces/tutor.interface";
import Tutorial from "@/components/Tutorial/Tutorial";
import SkeletonTutorial from "@/components/Skeletons/SkeletonTutorial";
import styles from "./Aside.module.css";

interface AsideProps {
  tutorials: any[];
  selectedTutor: tutorProps;
  loading: boolean;
  loadingSwitchingTutor: boolean;
  onOpen: () => void;
  title?: string;
}

const Aside: React.FC<AsideProps> = React.memo(({
  tutorials,
  selectedTutor,
  loading,
  loadingSwitchingTutor,
  onOpen,
  title = "Tutorias",
}) => {
  const theme = useTheme();

  const renderTutorials = () => {
    if (loadingSwitchingTutor) {
      return <SkeletonTutorial />;
    }

    if (selectedTutor.id && tutorials.length === 0) {
      return (
        <Box className={styles.noTutorialsBox}>
          <Typography variant="subtitle1">Sem tutoriais cadastrados para esse usuário</Typography>
        </Box>
      )
    }

    return tutorials.map((tutorial) => (
      <Tutorial
        key={tutorial.id}
        id={tutorial.id}
        estimatedDuration={tutorial.estimatedDuration}
        title={tutorial.title}
        summary={tutorial.summary}
        difficultyLevel={tutorial.difficultyLevel}
      />
    ));
  };

  return (
    <Box sx={{ flex: 1, padding: "16px", height: "calc(65vh)", position: "relative" }}>
      <Box
        sx={{
          padding: "24px 16px 16px 13px",
          backgroundColor: theme.palette.secondary.main,
          borderRadius: "24px",
          height: "100%",
          overflowY: "auto",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: 28,
            marginLeft: 1,
            fontWeight: 600,
            marginBottom: 1,
          }}
          gutterBottom
        >
          {title}
        </Typography>

        <List>{renderTutorials()}</List>

        {selectedTutor.id ? (
          <Box className={styles.noTutorialsBox}>
            <Button
              variant="contained"
              color={loading ? "info" : "warning"}
              sx={{ mt: 2, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "3rem" }}
              onClick={onOpen}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Registrar tutorial"}
            </Button>
          </Box>
        ) : (
          <Box className={styles.noTutorialsBox}>
            <Typography variant="subtitle1">Selecione um tutor ao lado para visualizar as tutoriais associadas a ele</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
});

export default Aside;