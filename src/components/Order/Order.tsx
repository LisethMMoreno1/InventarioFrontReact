import { Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import OrderIconWithModal from '../componentesGenerales/Modal/IconWithModal';

const OrderForm: React.FC<{ formik: any }> = ({ formik }) => {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                padding: 4,
                borderRadius: 2,
                boxShadow: 5,
                width: '90%',
                mt: 3
            }}
        >
            <Typography variant="h4" component="h2" gutterBottom>
                Orden de Cliente
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="orderDate"
                        name="orderDate"
                        label="Fecha de Orden"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formik.values.orderDate || ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={
                            formik.touched.orderDate && formik.errors.orderDate ? formik.errors.orderDate : ''
                        }
                        error={formik.touched.orderDate && Boolean(formik.errors.orderDate)}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <OrderIconWithModal />
                </Grid>
            </Grid>
        </Box>
    );
};

export { OrderForm };

