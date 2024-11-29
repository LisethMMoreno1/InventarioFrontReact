import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { ProductIList } from '../../interfaces/Products/listaProduct';
import { getProduct } from '../../services/api/ProductService/productService';
import DataGridComponent from '../componentesGenerales/Tabla/tabla.components';
import ButtonExport from './funcionExport/ButtonExportProduct';


const ProductList: React.FC = () => {
    const [products, setProducts] = useState<ProductIList[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProduct();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const columns: GridColDef<ProductIList>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'nameofProduct', headerName: 'Nombre del Producto', width: 200 },
        { field: 'description', headerName: 'Descripción', width: 150 },
        { field: 'price', headerName: 'Precio', type: 'number', width: 150 },
        { field: 'quantityAvailable', headerName: 'Cantidad Disponible', type: 'number', width: 200 },
        { field: 'category', headerName: 'Categoria', width: 100, renderCell: ({ row }) => row?.category?.categoryName },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 200,
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
                    <Tooltip title="Ver">
                        <Button
                            color="success"
                            size="small"
                            startIcon={<VisibilityIcon />}
                            onClick={() => handleViewClick(params.row)}
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

    // Handle button clicks
    const handleEditClick = (product: ProductIList) => {
        alert(`Editar producto: ${product.nameofProduct}`);
    };

    const handleViewClick = (product: ProductIList) => {
        alert(`Ver detalles de: ${product.nameofProduct}`);
    };

    const handleDeleteClick = (product: ProductIList) => {
        alert(`Borrar producto: ${product.nameofProduct}`);
    };

    return (
        <Box>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <DataGridComponent rows={products} columns={columns} >
                    Lista de Productos
                </DataGridComponent>
            )}
        </Box>
    );
};

export default ProductList;
