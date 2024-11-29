import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Container, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { RolesInter } from '../../../interfaces/Rol/rol';
import { deleteRoles, getRoles } from '../../../services/api/RolesService/rolesService';
import useRolesStore from '../../../stores/RolesStore';
import { showErrorAlert, showSuccessAlert } from '../../../Utils/alert';
import DataGridComponent from '../../componentesGenerales/Tabla/tabla.components';

const ListRoles: React.FC = () => {
    const { roles, setRoles } = useRolesStore((state) => ({
        roles: state.roles,
        setRoles: state.setRoles,
    }));



    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const rolesData = await getRoles();
                setRoles(rolesData);
            } catch (error) {
                console.error('Error al obtener tipos de rol:', error);
            }
        };
        fetchRoles();
    }, [setRoles]);

    const columns: GridColDef<RolesInter>[] = [
        { field: 'typeOfRole', headerName: 'Tipo de Rol', width: 350 },
        {
            field: 'Acciones',
            headerName: 'Acciones',
            width: 150,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 1 }}>
                    <Tooltip title="Editar">
                        <Button
                            color="primary"
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => handleEditClick(params.row)}
                            sx={{
                                border: 'none',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none',
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
                                border: 'none',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none',
                                },
                            }}
                        />
                    </Tooltip>
                </Box>
            ),
        },
    ];

    const handleEditClick = (role: RolesInter) => {
        alert(`Editar tipo de rol: ${role.typeOfRole}`);
    };

    const handleDeleteClick = async (role: RolesInter) => {
        try {
            await deleteRoles(role);
            const updatedRoles = await getRoles();
            showSuccessAlert(`Tipo de rol ${role.typeOfRole} eliminado exitosamente`);
            setRoles(updatedRoles);
        } catch (error) {
            console.error('Hubo un problema al eliminar el tipo de rol:', error);
            showErrorAlert(`Hubo un problema al eliminar el tipo de rol ${role.typeOfRole}`);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box mt={5}>
                <DataGridComponent rows={roles} columns={columns}>
                    Lista de roles
                </DataGridComponent>
            </Box>
        </Container >
    );
};

export default ListRoles;
