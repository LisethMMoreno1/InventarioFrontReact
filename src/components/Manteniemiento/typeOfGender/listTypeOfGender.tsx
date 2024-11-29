import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Container, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { GenreInter } from '../../../interfaces/typeOfGenders/typeOfGenders';
import { deleteTypeOfGenders, getTypeOfGenders } from '../../../services/api/genreService/genreService';
import useTypeOfGenderStore from '../../../stores/TypeOfGenderStore';
import { showErrorAlert, showSuccessAlert } from '../../../Utils/alert';
import DataGridComponent from '../../componentesGenerales/Tabla/tabla.components';
import UpdateTypeOfGenderModal from './Actions/UpdateTypeOfGenderModal';

const ListTypeOfGender: React.FC = () => {
    const { genreInter, setGenreInter } = useTypeOfGenderStore((state) => ({
        genreInter: state.genreInter,
        setGenreInter: state.setGenreInter,
    }));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTypeOfGenderId, setSelectedTypeOfGenderId] = useState<number | null>(null);

    useEffect(() => {
        const fetchTypeOfGender = async () => {
            try {
                const typeOfGenderData = await getTypeOfGenders();
                setGenreInter(typeOfGenderData);
            } catch (error) {
                console.error('Error al obtener tipos de identificación:', error);
            }
        };
        fetchTypeOfGender();
    }, [setGenreInter]);

    const columns: GridColDef<GenreInter>[] = [
        { field: 'genre', headerName: 'Genre', width: 350 },
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
                            onClick={() => handleOpenModal(params.row.id)}
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

    const handleOpenModal = (id: number) => {
        setSelectedTypeOfGenderId(id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTypeOfGenderId(null);
    };

    const handleDeleteClick = async (TypeOfGender: GenreInter) => {
        try {
            await deleteTypeOfGenders(TypeOfGender);
            const updatedTypeOfGenders = await getTypeOfGenders();
            showSuccessAlert(`Tipo genero ${TypeOfGender.genre} eliminado exitosamente`);
            setGenreInter(updatedTypeOfGenders);
        } catch (error) {
            console.error('Hubo un problema al eliminar el tipo de género:', error);
            showErrorAlert(`Hubo un problema al eliminar el tipo de género ${TypeOfGender.genre}`);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box mt={5}>
                <DataGridComponent rows={genreInter} columns={columns}>
                    Lista de Géneros
                </DataGridComponent>
                <UpdateTypeOfGenderModal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    typeOfGenderId={selectedTypeOfGenderId ?? 0} 
                />
            </Box>
        </Container>
    );
};

export default ListTypeOfGender;

