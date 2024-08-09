import React, { useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '@/store/hooks';
import { tutorProps } from '@/interfaces/tutor.interface';
import { tutorialInterface } from '@/interfaces/tutorial.interta';
import { createTutorial } from '@/store/appDataSlice/appDataSlice';

interface TutorialModalProps {
  open: boolean;
  selectedTutor: tutorProps;
  handleClose: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ open, handleClose, selectedTutor }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [duration, setDuration] = useState<number | string>('');
  const [difficulty, setDifficulty] = useState('');
  const [success, setSuccess] = useState(false);
  const handleSave = () => {
    const newTutorial: tutorialInterface = {
      creatorId: selectedTutor.id,
      title,
      summary,
      estimatedDuration: String(duration),
      difficultyLevel: difficulty,
      isDeleted: 0,
    };
    dispatch(createTutorial(newTutorial));
    setSuccess(true);

    setTitle('');
    setSummary('');
    setDuration('');
    setDifficulty('');

    setTimeout(() => {
      setSuccess(false);
      handleClose();
    }, 2000);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'white', p: 5, pb: 8, borderRadius: 2 }}>
        {success ? (
          <Typography variant="h4" component="h2" sx={{ mb: 2, mt: 2, textAlign: 'center', color: 'green' }}>
            Tutorial salvo com sucesso!
          </Typography>
        ) : (
          <>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>Registrar Tutorial</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Título" required value={title} onChange={(e) => setTitle(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Sumário" required multiline rows={4} value={summary} onChange={(e) => setSummary(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Duração (horas)" type="number" required value={duration} onChange={(e) => setDuration(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="select-label">Dificuldade</InputLabel>
                  <Select labelId="select-label" value={difficulty} onChange={(e) => setDifficulty(e.target.value as string)} label="Dificuldade">
                    <MenuItem value="beginner">Iniciante</MenuItem>
                    <MenuItem value="intermediate">Intermediário</MenuItem>
                    <MenuItem value="advanced">Avançado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4} mt={8} alignItems={"center"} justifyContent={'center'}>
                <Button variant="contained" color="primary" fullWidth onClick={handleSave}>Salvar</Button>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default TutorialModal;