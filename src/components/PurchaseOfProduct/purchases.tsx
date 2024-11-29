import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showErrorAlert, showSuccessAlert } from '../../Utils/alert';
import { ProductI } from '../../interfaces/Products/product';
import { purchaseOfProduct } from '../../interfaces/PurchaseOfProduct/purchaseOfProductReques';
import { getProduct } from '../../services/api/ProductService/productService';
import { postPurchases } from '../../services/api/PurchaseOfProductServices/purchaseOfProductService';
import { usePurchaseStore } from '../../stores/purchaseOfProductStore';
import { purchaseSchema } from '../../types/purchaseOfProduct/purchaseOfProductSchema';

const Purchase: React.FC = () => {
    const navigate = useNavigate();
    usePurchaseStore((state) => ({
        purchases: state.purchases,
        setPurchases: state.setPurchases,
    }));

    const [products, setProducts] = useState<ProductI[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<string>(''); // Cambia a string

    const formik = useFormik({
        initialValues: {
            productId: '',
            customerIdentificationNumber: '',
            quantity: '',
        },
        validationSchema: purchaseSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const PurchaseOfProductRequest: purchaseOfProduct = {
                    id: 0,
                    productId: Number(values.productId), // Asegúrate de que esto sea el tipo correcto
                    customerIdentificationNumber: values.customerIdentificationNumber,
                    quantity: parseFloat(values.quantity),
                };

                console.log(PurchaseOfProductRequest, '❤️❤️❤️');

                await postPurchases(PurchaseOfProductRequest);
                showSuccessAlert('Compra registrada exitosamente');
                resetForm();
                navigate('/Producto/Lista%20de%20Compras');
            } catch (error) {
                showErrorAlert('Error al registrar la compra');
            }
        }
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getProduct(); // Llama a tu servicio para obtener los productos
                setProducts(productsData);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Container maxWidth={"lg"}>
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 5,
                }}
            >
                <Typography variant="h4" component="h2" gutterBottom>
                    Registro de Compra
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="product-label">Productos</InputLabel>
                                <Select
                                    labelId="product-label"
                                    id="productId"
                                    name="productId"
                                    value={selectedProduct}
                                    onChange={(e) => {
                                        setSelectedProduct(e.target.value as string);
                                        formik.setFieldValue('productId', e.target.value); 
                                    }}
                                    label="Producto"
                                >
                                    {products.map((product) => (
                                        <MenuItem key={product.id} value={product.id}>
                                            {product.nameofProduct} - {product.description}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                margin="normal"
                                id="customerIdentificationNumber"
                                name="customerIdentificationNumber"
                                label="Identificación Cliente"
                                value={formik.values.customerIdentificationNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.touched.customerIdentificationNumber && formik.errors.customerIdentificationNumber ? formik.errors.customerIdentificationNumber : ''}
                                error={formik.touched.customerIdentificationNumber && Boolean(formik.errors.customerIdentificationNumber)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                margin="normal"
                                id="quantity"
                                name="quantity"
                                label="Cantidad de Producto"
                                type="text"
                                value={formik.values.quantity}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : ''}
                                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                            />
                        </Grid>
                    </Grid>
                    <Box mt={3}>
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Registrar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default Purchase;
