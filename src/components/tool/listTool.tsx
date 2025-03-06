"use client";

import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridColDef } from "@mui/x-data-grid";
import { Tool } from "../../types/tool/tool.type";
import { toolsService } from "../../services/toolsService";
import DataGridComponent from "../componentesGenerales/Tabla/tabla.components";
import EditToolModal from "./updateTool";
import DeleteItemModal from "../componentesGenerales/Tabla/ButtonTable/DeleteButton";

interface ListToolProps {
  refresh: boolean;
}

const ListTool: React.FC<ListToolProps> = ({ refresh }) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedToolId, setSelectedToolId] = useState<number | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false); // Estado para el modal de eliminación

  useEffect(() => {
    fetchTools();
  }, [refresh]);

  const fetchTools = async () => {
    try {
      const data = await toolsService.getAll();
      setTools(data);
    } catch (error) {
      console.error("Error al obtener herramientas:", error);
    }
  };

  const handleEdit = (tool: Tool) => {
    setSelectedToolId(tool.id);
    setEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setSelectedToolId(id);
    setOpenDeleteModal(true); // Abre el modal de eliminación
  };

  const handleDeleteSuccess = () => {
    fetchTools(); // Refresca la lista después de eliminar
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "type", headerName: "Tipo", width: 100 },
    { field: "code", headerName: "Código", width: 100 },
    { field: "description", headerName: "Descripción", width: 250 },
    {
      field: "state",
      headerName: "Estado",
      width: 100,
      renderCell: (params) => (params.value ? "Activo" : "Inactivo"),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row as Tool)}
            color="primary"
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete((params.row as Tool).id)} // Abre el modal de eliminación
            color="secondary"
            size="small"
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
          onClose={() => {
            setEditModalOpen(false);
            setSelectedToolId(null);
          }}
          onSuccess={fetchTools}
        />
      )}

      {/* Modal de eliminación */}
      <DeleteItemModal
        open={openDeleteModal}
        itemId={selectedToolId!} // Asegúrate de que selectedToolId no sea null
        itemName="herramienta"
        onClose={() => setOpenDeleteModal(false)}
        onSuccess={handleDeleteSuccess}
        deleteItem={toolsService.delete}
      />
    </>
  );
};

export default ListTool;
