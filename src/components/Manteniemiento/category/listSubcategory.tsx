import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import useCategoryStore from '../../../stores/Categorys';
import DataGridComponent from '../../componentesGenerales/Tabla/tabla.components';

const SubCategoryList: React.FC = () => {
    const { subcategories, fetchCategoriesAndSubCategories } = useCategoryStore((state) => ({
        subcategories: state.subcategories,
        fetchCategoriesAndSubCategories: state.fetchCategoriesAndSubCategories,
    }));

    useEffect(() => {
        fetchCategoriesAndSubCategories();
    }, [fetchCategoriesAndSubCategories]);

    const handleEditClick = (row: any) => {
        console.log("Edit", row);
    };

    const handleDeleteClick = (row: any) => {
        console.log("Delete", row);
    };

    const columns: GridColDef[] = [
        { field: 'subcategoryName', headerName: 'Sub-Categoría', width: 350 },
        { field: 'description', headerName: 'Categoria', width: 350 },
        {
            field: 'actions',
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

    return (
        <Box sx={{ padding: 2 }}>

            <DataGridComponent rows={subcategories} columns={columns}>
                Lista de Sub-Categorías
            </DataGridComponent>

        </Box>
    );
};

export default SubCategoryList;
