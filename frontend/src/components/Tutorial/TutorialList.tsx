import React, { useState } from 'react';
import { List } from '@mui/material';
import Tutorial from './Tutorial';
import FeedbackSnackbar from '../Feedback/FeedbackSnackbar';
import { tutorialInterface } from '@/interfaces/tutorial.interta';

interface TutorialListProps {
  tutorials: tutorialInterface[];
  selectedTutorialId?: string;
}

const TutorialList: React.FC<TutorialListProps> = ({ tutorials, selectedTutorialId }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <List>
        {tutorials.map((tutorial) => (
          <Tutorial
            key={tutorial.id}
            tutorial={tutorial}
            selected={tutorial.id === selectedTutorialId}
            showSnackbar={showSnackbar}
          />
        ))}
      </List>

      <FeedbackSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default TutorialList;