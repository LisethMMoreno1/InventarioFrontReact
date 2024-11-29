import { Button, Container, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { GenreInter } from '../../../interfaces/typeOfGenders/typeOfGenders';
import { getTypeOfGenders, postTypeOfGenders } from '../../../services/api/genreService/genreService';
import useTypeOfGenderStore from '../../../stores/TypeOfGenderStore';
import { typeOfGendersSchema } from '../../../types/Mantenimiento/typeOfGenders/typeOfGenders';
import { showErrorAlert, showSuccessAlert } from '../../../Utils/alert';

const TypeOfGender: React.FC = () => {
    const { setGenreInter } = useTypeOfGenderStore((state) => ({
        genreInter: state.genreInter,
        setGenreInter: state.setGenreInter,
    }));
    const formik = useFormik({
        initialValues: {
            genre: '',
        },
        validationSchema: typeOfGendersSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const typeOfGendersRequest: GenreInter = {
                    id: 0,
                    genre: values.genre,
                };

                const response = await postTypeOfGenders(typeOfGendersRequest);
                if (!response.ok)
                    showSuccessAlert('Tipo de género registrado exitosamente');
                resetForm();

            } catch (error) {
                showErrorAlert('Ya hiciste un tipo de género con ese nombre');
            }
        },
    });

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
                    Creación de Generos
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                value={formik.values.genre}
                                onChange={formik.handleChange}
                                margin="normal"
                                id="genre"
                                name="genre"
                                label="Nombre del Género"
                                error={formik.touched.genre && Boolean(formik.errors.genre)}
                                helperText={formik.touched.genre && formik.errors.genre}
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

        </Container>
    );
};

export default TypeOfGender;
