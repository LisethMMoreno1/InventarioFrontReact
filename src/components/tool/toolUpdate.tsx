"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useToolsStore } from "../../store/tool/useToolStore";

interface EditToolModalProps {
  open: boolean;
  toolId: number;
  onClose: () => void;
}

const EditToolModal: React.FC<EditToolModalProps> = ({
  open,
  toolId,
  onClose,
}) => {
  const { tools, updateTool } = useToolsStore();
  const [toolData, setToolData] = useState({ name: "", description: "" });

  useEffect(() => {
    const tool = tools.find((t) => t.id === toolId);
    if (tool) {
      setToolData({ name: tool.name, description: tool.description });
    }
  }, [toolId, tools]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToolData({ ...toolData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await updateTool(toolId, toolData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Utilitario</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          name="name"
          value={toolData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Descripción"
          name="description"
          value={toolData.description}
          onChange={handleChange}
          fullWidth
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleUpdate} variant="contained" color="primary">
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditToolModal;
