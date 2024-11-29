import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { getCities, getDepartments, postCities, postDepartments } from '../../../services/api/CountryServices/countryService';
import useCountryStore from '../../../stores/Country';
import { countrySchema } from '../../../types/Mantenimiento/country/country';
import { showErrorAlert, showSuccessAlert } from '../../../Utils/alert';

interface CombinedData {
    id: number;
    Department: string;
    codeDepartment: string;
    cities: string;
    codeCities: string;
}

const Country: React.FC = () => {
    const { setCountry } = useCountryStore(state => ({
        country: state.country,
        setCountry: state.setCountry,
    }));

    const [, setCombinedData] = useState<CombinedData[]>([]);

    const formik = useFormik({
        initialValues: {
            cities: '',
            codeCities: '',
            Department: '',
            codeDepartment: '',
        },
        validationSchema: countrySchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                // Petición para registrar departamento
                const departmentsRequest = {
                    id: 0,
                    Department: values.Department,
                    codeDepartment: values.codeDepartment,
                };

                const departmentResponse = await postDepartments(departmentsRequest);

                const departmentId = departmentResponse.id;

                // Petición para registrar ciudad
                const citiesRequest = {
                    id: 0,
                    cities: values.cities,
                    codeCities: values.codeCities,
                    departmentId: departmentId,
                };

                const cityResponse = await postCities(citiesRequest);

                if (departmentResponse.ok && cityResponse.ok) {
                    showSuccessAlert('Ciudad y Departamento registrados exitosamente');
                    resetForm();
                } else {
                    showErrorAlert('Error al registrar Ciudad o Departamento');
                }
            } catch (error) {
                showErrorAlert('Error al registrar la Ciudad o Departamento');
            }
        },
    });

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const citiesData = await getCities();
                const departmentsData = await getDepartments();

                // Combine cities and departments into a single array
                const combined = departmentsData.map(department => ({
                    ...department,
                    cities: '',
                    codeCities: '',
                }));

                const updatedCombined = combined.map(department => {
                    const cities = citiesData.find(city => city.departmentId === department.id);
                    return {
                        ...department,
                        cities: cities ? cities.cities : '',
                        codeCities: cities ? cities.codeCities : '',
                    };
                });

                setCombinedData(updatedCombined);
                setCountry([...citiesData, ...departmentsData]);
            } catch (error) {
                console.error('Error al obtener ciudades y departamentos:', error);
            }
        };

        fetchCountry();
    }, [setCountry]);



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
                    Creación de Ciudad y Departamento
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                value={formik.values.Department}
                                onChange={formik.handleChange}
                                margin="normal"
                                id="Department"
                                name="Department"
                                label="Nombre del Departamento"
                                error={formik.touched.Department && Boolean(formik.errors.Department)}
                                helperText={formik.touched.Department && formik.errors.Department}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                value={formik.values.codeDepartment}
                                onChange={formik.handleChange}
                                margin="normal"
                                id="codeDepartment"
                                name="codeDepartment"
                                label="Código del Departamento"
                                error={formik.touched.codeDepartment && Boolean(formik.errors.codeDepartment)}
                                helperText={formik.touched.codeDepartment && formik.errors.codeDepartment}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                value={formik.values.cities}
                                onChange={formik.handleChange}
                                margin="normal"
                                id="cities"
                                name="cities"
                                label="Nombre de la Ciudad"
                                error={formik.touched.cities && Boolean(formik.errors.cities)}
                                helperText={formik.touched.cities && formik.errors.cities}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                value={formik.values.codeCities}
                                onChange={formik.handleChange}
                                margin="normal"
                                id="codeCities"
                                name="codeCities"
                                label="Código de la Ciudad"
                                error={formik.touched.codeCities && Boolean(formik.errors.codeCities)}
                                helperText={formik.touched.codeCities && formik.errors.codeCities}
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

export default Country;
