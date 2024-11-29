import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Container, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { showErrorAlert, showSuccessAlert } from "../../../Utils/alert";
import { typeOfIdentification } from "../../../interfaces/typeOfIdentification/typeOfIdentification";
import {
    deleteTypeOfIdentifications,
    getTypeOfIdentifications
} from "../../../services/api/typeOfIdentificationService/typeOfIdentificationService";
import typeOfIdentificationStore from "../../../stores/TypeOfIdentificationStore";
import DataGridComponent from "../../componentesGenerales/Tabla/tabla.components";

const ListTypeOfIdentification: React.FC = () => {
    const { typeOfIdentification, setTypeOfIdentifications } =
        typeOfIdentificationStore((state) => ({
            typeOfIdentification: state.typeOfIdentification,
            setTypeOfIdentifications: state.setTypeOfIdentifications,
        }));


    useEffect(() => {
        const fetchTypeOfIdentifications = async () => {
            try {
                const typeOfIdentificationsData = await getTypeOfIdentifications();
                setTypeOfIdentifications(typeOfIdentificationsData);
            } catch (error) {
                console.error("Error al obtener tipos de identificación:", error);
            }
        };

        fetchTypeOfIdentifications();
    }, [setTypeOfIdentifications]);

    const columns: GridColDef<typeOfIdentification>[] = [
        { field: "name", headerName: "Nombre", width: 350 },
        { field: "identifier", headerName: "Código Identificador", width: 350 },
        {
            field: "Acciones",
            headerName: "Acciones",
            width: 150,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        marginTop: 1,
                    }}
                >
                    <Tooltip title="Editar">
                        <Button
                            color="primary"
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => handleEditClick(params.row)}
                            sx={{
                                border: "none",
                                boxShadow: "none",
                                "&:hover": {
                                    boxShadow: "none",
                                },
                            }}
                        />
                    </Tooltip>

                    <Tooltip title="Eliminar">
                        <Button
                            color="error"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDeleteClick(params.row)}
                            sx={{
                                border: "none",
                                boxShadow: "none",
                                "&:hover": {
                                    boxShadow: "none",
                                },
                            }}
                        />
                    </Tooltip>
                </Box>
            ),
        },
    ];

    const handleEditClick = (typeOfIdentification: typeOfIdentification) => {
        alert(`Editar tipo de identificación: ${typeOfIdentification.name}`);
    };

    const handleDeleteClick = async (
        typeOfIdentification: typeOfIdentification
    ) => {
        try {
            await deleteTypeOfIdentifications(typeOfIdentification);
            const updatedTypeOfIdentifications = await getTypeOfIdentifications();
            showSuccessAlert(
                `Tipo de identificación ${typeOfIdentification.name} eliminado exitosamente`
            );
            setTypeOfIdentifications(updatedTypeOfIdentifications);
        } catch (error) {
            console.error(
                "Hubo un problema al eliminar el tipo de identificación:",
                error
            );
            showErrorAlert(
                `Hubo un problema al eliminar el tipo de identificación ${typeOfIdentification.name}`
            );
        }
    };

    return (
        <Container maxWidth="lg">
            <Box mt={5}>
                <DataGridComponent rows={typeOfIdentification} columns={columns}>
                    Lista de Tipo de Identificaciones
                </DataGridComponent>
            </Box>
        </Container>
    );
};

export default ListTypeOfIdentification;
