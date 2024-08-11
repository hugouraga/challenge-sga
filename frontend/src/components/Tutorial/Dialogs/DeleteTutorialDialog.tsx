import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface DeleteTutorialDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteTutorialDialog: React.FC<DeleteTutorialDialogProps> = ({ open, onClose, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ backgroundColor: 'white' }}>Excluir Tutorial</DialogTitle>
      <DialogContent style={{ backgroundColor: 'white' }}>
        <p>Você tem certeza que deseja excluir este tutorial?</p>
      </DialogContent>
      <DialogActions style={{ backgroundColor: 'white' }}>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onDelete} color="secondary" style={{ color: 'red' }}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTutorialDialog;