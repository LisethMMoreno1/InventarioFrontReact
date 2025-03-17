"use client";

import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridColDef } from "@mui/x-data-grid";
import DataGridComponent from "../componentesGenerales/Tabla/tabla.components";

import DeleteItemModal from "../componentesGenerales/Tabla/ButtonTable/DeleteButton";
import { useToolsStore } from "../../store/tool/useToolStore";
import EditToolModal from "./toolUpdate";

const ListTool: React.FC = () => {
  const { tools, fetchTools, deleteTool } = useToolsStore();
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedToolId, setSelectedToolId] = useState<number | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  const handleEdit = (toolId: number) => {
    setSelectedToolId(toolId);
    setEditModalOpen(true);
  };

  const handleDelete = async (toolId: number) => {
    if (!toolId) {
      console.error("Error: toolId es inválido");
      return;
    }

    try {
      await deleteTool(toolId);
      setOpenDeleteModal(false);
    } catch (error) {
      console.error("Error eliminando herramienta:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "type", headerName: "Tipo", width: 200 },
    { field: "code", headerName: "Código", width: 100 },
    { field: "description", headerName: "Descripción", width: 250 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.id)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setSelectedToolId(params.row.id);
              setOpenDeleteModal(true);
            }}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <DataGridComponent
        rows={tools}
        columns={columns}
        title="Lista de Utilitarios"
      />
      {selectedToolId !== null && (
        <EditToolModal
          open={editModalOpen}
          toolId={selectedToolId}
          onClose={() => setEditModalOpen(false)}
        />
      )}
      <DeleteItemModal
        open={openDeleteModal}
        itemId={selectedToolId ?? 0}
        itemName="Herramienta"
        onClose={() => setOpenDeleteModal(false)}
        onSuccess={() => selectedToolId && handleDelete(selectedToolId)}
        deleteItem={deleteTool}
      />
    </>
  );
};

export default ListTool;
