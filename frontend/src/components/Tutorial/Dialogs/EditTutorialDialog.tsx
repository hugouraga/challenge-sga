import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface EditTutorialDialogProps {
  open: boolean;
  title: string;
  summary: string;
  duration: number | string;
  difficulty: string;
  onClose: () => void;
  onSave: () => void;
  setTitle: (title: string) => void;
  setSummary: (summary: string) => void;
  setDuration: (duration: number | string) => void;
  setDifficulty: (difficulty: string) => void;
}

const EditTutorialDialog: React.FC<EditTutorialDialogProps> = ({
  open, title, summary, duration, difficulty,
  onClose, onSave, setTitle, setSummary, setDuration, setDifficulty
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ backgroundColor: 'white' }}>Editar Tutorial</DialogTitle>
      <DialogContent style={{ backgroundColor: 'white' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Título"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Sumário"
              required
              multiline
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Duração (horas)"
              type="number"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="select-label">Dificuldade</InputLabel>
              <Select
                labelId="select-label"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as string)}
                label="Dificuldade"
              >
                <MenuItem value="beginner">Iniciante</MenuItem>
                <MenuItem value="intermediate">Intermediário</MenuItem>
                <MenuItem value="advanced">Avançado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ backgroundColor: 'white' }}>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onSave} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTutorialDialog;