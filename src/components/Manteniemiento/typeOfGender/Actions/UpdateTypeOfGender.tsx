import { Box, Button, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { getTypeOfGenderById, updateTypeOfGenders } from '../../../../services/api/genreService/genreService';

interface UpdateTypeOfGenderProps {
    id: number;
}

const validationSchema = Yup.object({
    genre: Yup.string().required('Name is required'),

});

const UpdateTypeOfGender: React.FC<UpdateTypeOfGenderProps> = ({ id }) => {
    const [initialValues, setInitialValues] = useState<{ genre: string; }>({ genre: '' });

    useEffect(() => {
        const fetchTypeOfGender = async () => {
            try {
                const response = await getTypeOfGenderById(id);
                setInitialValues({
                    genre: response.genre || '',

                });
            } catch (error) {
                console.error('Error fetching type of gender:', error);
            }
        };

        if (id) fetchTypeOfGender();
    }, [id]);

    const handleSubmit = async (values: { genre: string; }) => {
        try {
            await updateTypeOfGenders({
                id,
                genre: values.genre,

            });
            alert('Type of Gender updated successfully!');
        } catch (error) {
            console.error('Error updating Type of Gender:', error);
            alert('Failed to update Type of Gender');
        }
    };

    return (
        <Box component="div" sx={{ p: 2 }}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <Field
                            name="genre"
                            as={TextField}
                            label="genre"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={touched.genre && !!errors.genre}
                            helperText={touched.genre && errors.genre}
                        />



                        <Button type="submit" variant="contained" color="primary">
                            Actualizar
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default UpdateTypeOfGender;
