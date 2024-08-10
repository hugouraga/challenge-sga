"use client";

import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { ListItem, ListItemText, IconButton, Avatar, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, FormControl, InputLabel, Select, Snackbar, Alert } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteTutorial, editTutorial } from '@/store/appDataSlice/appDataSlice';
import { tutorialInterface } from '@/interfaces/tutorial.interta';


const Tutorial: React.FC<tutorialInterface> = ({ id, title, estimatedDuration, difficultyLevel, summary, createdAt }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const [editTitle, setEditTitle] = useState(title);
  const [editSummary, setEditSummary] = useState(summary);
  const [editDuration, setEditDuration] = useState<number | string>(estimatedDuration ?? 0);
  const [editDifficulty, setEditDifficulty] = useState(difficultyLevel);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setEditOpen(true);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteOpen(true);
    handleMenuClose();
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleSaveEdit = async () => {
    try {
      await dispatch(
        editTutorial({
          id,
          title: editTitle,
          summary: editSummary,
          estimatedDuration: editDuration,
          difficultyLevel: editDifficulty,
        })
      ).unwrap();

      setSnackbarMessage('Tutorial atualizado com sucesso!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setTimeout(() => {
        setSnackbarOpen(false);
      }, 5000);

      handleEditClose();
    } catch (error) {
      setSnackbarMessage('Erro ao atualizar o tutorial!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);

      setTimeout(() => {
        setSnackbarOpen(false);
      }, 5000);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!id) return;
      setSnackbarOpen(true);
      await dispatch(deleteTutorial(id)).unwrap();
      setSnackbarMessage('Tutorial excluído com sucesso!');
      setSnackbarSeverity('success');

      setTimeout(() => {
        setSnackbarOpen(false);
      }, 5000);

      handleDeleteClose();
    } catch (error) {
      setSnackbarMessage('Erro ao excluir o tutorial!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);

      setTimeout(() => {
        setSnackbarOpen(false);
      }, 5000);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <ListItem key={id} sx={{ display: 'flex' }}>
        <Avatar
          alt="Imagem Tutorial"
          src="https://cdn-icons-png.flaticon.com/512/684/684872.png"
          sx={{ width: 44, height: 44 }}
          style={{ marginRight: 16 }}
        />
        <ListItemText
          primary={title}
          secondary={`${estimatedDuration} Hora${estimatedDuration ?? 0 > 1 ? 's' : ''}`}
          primaryTypographyProps={{ fontWeight: 800 }}
          secondaryTypographyProps={{ fontWeight: 500 }}
        />
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditClick}>Editar</MenuItem>
          <MenuItem onClick={handleDeleteClick}>Excluir</MenuItem>
        </Menu>
      </ListItem>

      {/* Dialog para Editar */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle style={{ backgroundColor: 'white' }}>Editar Tutorial</DialogTitle>
        <DialogContent style={{ backgroundColor: 'white' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título"
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Sumário"
                required
                multiline
                rows={4}
                value={editSummary}
                onChange={(e) => setEditSummary(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Duração (horas)"
                type="number"
                required
                value={editDuration}
                onChange={(e) => setEditDuration(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="select-label">Dificuldade</InputLabel>
                <Select
                  labelId="select-label"
                  value={editDifficulty}
                  onChange={(e) => setEditDifficulty(e.target.value as string)}
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
          <Button onClick={handleEditClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para Excluir */}
      <Dialog open={deleteOpen} onClose={handleDeleteClose} >
        <DialogTitle style={{ backgroundColor: 'white' }}>Excluir Tutorial</DialogTitle>
        <DialogContent style={{ backgroundColor: 'white' }}>
          <p>Você tem certeza que deseja excluir este tutorial?</p>
        </DialogContent>
        <DialogActions style={{ backgroundColor: 'white' }}>
          <Button onClick={handleDeleteClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" style={{ color: 'red' }}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificação de sucesso ou erro */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Tutorial;