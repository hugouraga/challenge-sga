"use client";

import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { ListItem, ListItemText, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import EditTutorialDialog from './Dialogs/EditTutorialDialog';
import DeleteTutorialDialog from './Dialogs/DeleteTutorialDialog';
import { deleteTutorial, editTutorial } from '@/store/tutorialManagement/thunks';
import { tutorialInterface } from '@/interfaces/tutorial.interta';

interface TutorialProps {
  tutorial: tutorialInterface;
  selected: boolean;
  showSnackbar: (message: string, severity: 'success' | 'error') => void;
}

const Tutorial: React.FC<TutorialProps> = ({ tutorial, selected, showSnackbar }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editTitle, setEditTitle] = useState(tutorial?.title ?? '');
  const [editSummary, setEditSummary] = useState(tutorial?.summary ?? '');
  const [editDuration, setEditDuration] = useState<number | string>(tutorial?.estimatedDuration ?? 0);
  const [editDifficulty, setEditDifficulty] = useState(tutorial?.difficultyLevel ?? '');

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
      if (!tutorial.id) throw new Error('ID do tutorial não encontrado');
      await dispatch(
        editTutorial({
          id: tutorial.id,
          title: editTitle,
          summary: editSummary,
          estimatedDuration: editDuration ?? 0,
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
      if (!tutorial.id) return;
      await dispatch(deleteTutorial(tutorial.id)).unwrap();
      showSnackbar('Tutorial excluído com sucesso!', 'success');
      handleDeleteClose();
    } catch (error) {
      showSnackbar('Erro ao excluir o tutorial!', 'error');
    }
  };

  return (
    <>
      <ListItem
        key={tutorial?.id ?? ''}
        sx={{
          display: 'flex',
          backgroundColor: selected ? '#f0f4f8' : 'transparent',
          borderRadius: '4px',
          marginBottom: '8px',
          cursor: 'pointer',
        }}
      >
        <Avatar
          alt="Imagem Tutorial"
          src="https://cdn-icons-png.flaticon.com/512/684/684872.png"
          sx={{ width: 44, height: 44 }}
          style={{ marginRight: 16 }}
        />
        <ListItemText
          primary={tutorial?.title ?? ''}
          secondary={`${tutorial?.estimatedDuration ?? 0} Hora${tutorial?.estimatedDuration ?? 0 > 1 ? 's' : ''}`}
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
    </>
  );
};

export default Tutorial;