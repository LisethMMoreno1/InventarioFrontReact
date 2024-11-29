import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Container, Grid, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { GridColDef } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { RolesInter } from '../../../interfaces/Rol/rol';
import { deleteRoles, getRoles, postRoles } from '../../../services/api/RolesService/rolesService';
import useRolesStore from '../../../stores/RolesStore';
import { rolesSchema } from '../../../types/Mantenimiento/roles/roles';
import { showErrorAlert, showSuccessAlert } from '../../../Utils/alert';
import DataGridComponent from '../../componentesGenerales/Tabla/tabla.components';

const Roles: React.FC = () => {
    const { roles, setRoles } = useRolesStore((state) => ({
        roles: state.roles,
        setRoles: state.setRoles,
    }));

    const formik = useFormik({
        initialValues: {
            typeOfRole: '',
        },
        validationSchema: rolesSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const rolesRequest: RolesInter = {
                    id: 0,
                    typeOfRole: values.typeOfRole,
                };

                const response = await postRoles(rolesRequest);
                if (response.ok) {
                    showSuccessAlert('Tipo de rol registrado exitosamente');
                    const updatedRoles = await getRoles();
                    setRoles(updatedRoles);
                } else {
                    showErrorAlert('Error al registrar el tipo de rol');
                }
                resetForm();

            } catch (error) {
                showErrorAlert('Ya hiciste un tipo de rol con ese nombre');
            }
        },
    });

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
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 5,
                    width: '100%',
                }}
            >
                <Typography variant="h4" component="h2" gutterBottom>
                    Creación de Rol
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                value={formik.values.typeOfRole}
                                onChange={formik.handleChange}
                                margin="normal"
                                id="typeOfRole"
                                name="typeOfRole"
                                label="Nombre del Rol"
                                error={formik.touched.typeOfRole && Boolean(formik.errors.typeOfRole)}
                                helperText={formik.touched.typeOfRole && formik.errors.typeOfRole}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <Button color="primary" variant="contained" fullWidth type="submit" sx={{ marginTop: 2 }}>
                                Registrar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>

            <Box mt={5}>


                <DataGridComponent rows={roles} columns={columns}>
                    Lista de roles
                </DataGridComponent>
            </Box>
        </Container >
    );
};

export default Roles;
