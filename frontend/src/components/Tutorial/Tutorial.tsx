"use client";

import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { ListItem, ListItemText, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteTutorial, editTutorial } from '@/store/appDataSlice/appDataSlice';
import FeedbackSnackbar from '../Feedback/FeedbackSnackbar';
import { tutorialInterface } from '@/interfaces/tutorial.interta';
import EditTutorialDialog from './Dialogs/EditTutorialDialog';
import DeleteTutorialDialog from './Dialogs/DeleteTutorialDialog';


const Tutorial: React.FC<tutorialInterface> = ({ id, title, estimatedDuration, difficultyLevel, summary }) => {
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

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
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
      showSnackbar('Tutorial atualizado com sucesso!', 'success');
      handleEditClose();
    } catch (error) {
      showSnackbar('Erro ao atualizar o tutorial!', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!id) return;
      await dispatch(deleteTutorial(id)).unwrap();
      showSnackbar('Tutorial excluído com sucesso!', 'success');
      handleDeleteClose();
    } catch (error) {
      showSnackbar('Erro ao excluir o tutorial!', 'error');
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

      <EditTutorialDialog
        open={editOpen}
        title={editTitle ?? ''}
        summary={editSummary ?? ''}
        duration={editDuration}
        difficulty={editDifficulty ?? ''}
        onClose={handleEditClose}
        onSave={handleSaveEdit}
        setTitle={setEditTitle}
        setSummary={setEditSummary}
        setDuration={setEditDuration}
        setDifficulty={setEditDifficulty}
      />

      <DeleteTutorialDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        onDelete={handleConfirmDelete}
      />

      <FeedbackSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </>
  );
};

export default Tutorial;