"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toolsService } from "../../services/toolsService";
import { Tool } from "../../types/tool/tool.type";

interface EditToolModalProps {
  open: boolean;
  toolId: number;
  onClose: () => void;
  onSuccess: () => void;
}

const EditToolModal: React.FC<EditToolModalProps> = ({
  open,
  toolId,
  onClose,
  onSuccess,
}) => {
  const [toolData, setToolData] = useState<Tool | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Carga la herramienta cuando se abre el modal
  useEffect(() => {
    if (open && toolId) {
      setIsLoading(true);
      toolsService
        .getById(toolId)
        .then((data) => {
          setToolData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener la herramienta:", error);
          setIsLoading(false);
        });
    }
  }, [open, toolId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!toolData) return;
    const { name, value } = e.target;
    setToolData({ ...toolData, [name]: value });
  };

  const handleUpdate = async () => {
    if (!toolData) return;
    // Construimos el payload con solo los campos editables
    const payload = {
      name: toolData.name,
      description: toolData.description,
    };
    try {
      const updatedTool = await toolsService.update(toolData.id, payload);
      console.log("Utilitario actualizado:", updatedTool);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error actualizando la herramienta:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        // Prevenir cierre si se hace clic fuera del modal
        if (reason === "backdropClick") return;
        onClose();
      }}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Editar Utilitario
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
      <DialogContent dividers>
        {isLoading || !toolData ? (
          <div>Cargando...</div>
        ) : (
          <Grid container spacing={2}>
            {/* Campos editables */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                name="name"
                value={toolData.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Descripción"
                name="description"
                value={toolData.description}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                multiline
              />
            </Grid>
            {/* Campos en solo lectura */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tipo"
                name="type"
                value={toolData.type}
                fullWidth
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Código"
                name="code"
                value={toolData.code}
                fullWidth
                variant="outlined"
                disabled
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleUpdate} variant="contained" color="primary">
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditToolModal;
