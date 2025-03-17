"use client";

import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

interface ComponentFormProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  children: React.ReactNode;
}

const ComponentFormModal: React.FC<ComponentFormProps> = ({
  open,
  title,
  onClose,
  onSubmit,
  submitLabel = "Guardar",
  cancelLabel = "Cancelar",
  children,
}) => {
  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason === "backdropClick") return;
        onClose();
      }}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit" startIcon={<CancelIcon />}>
          {cancelLabel}
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          sx={{
            px: 3,
            borderRadius: 2,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            transition: "all 0.3s",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 6px 10px rgba(0,0,0,0.2)",
            },
          }}
        >
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComponentFormModal;
