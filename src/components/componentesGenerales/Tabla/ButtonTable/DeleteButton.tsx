"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface DeleteItemModalProps<T> {
  open: boolean;
  itemId: T;
  itemName: string;
  onClose: () => void;
  onSuccess: () => void;
  deleteItem: (id: T) => Promise<void>;
}

const DeleteItemModal = <T extends {}>({
  open,
  itemId,
  itemName,
  onClose,
  onSuccess,
  deleteItem,
}: DeleteItemModalProps<T>) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteItem(itemId);
      onSuccess();
      alert("Registro eliminado de manera exitosa");
      onClose();
    } catch (error) {
      console.error(`Error eliminando ${itemName} con ID ${itemId}:`, error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason === "backdropClick") return;
        onClose();
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Confirmar Eliminación</DialogTitle>
      <DialogContent dividers>
        <Typography>
          ¿Estás seguro de que deseas eliminar este {itemName}? Esta acción no
          se puede deshacer.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="secondary"
          disabled={isDeleting}
        >
          {isDeleting ? "Eliminando..." : "Eliminar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteItemModal;
