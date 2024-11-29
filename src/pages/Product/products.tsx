import { Container } from '@mui/material';
import React from 'react';
import Products from '../../components/Products/products';

const ProductsPage: React.FC = () => {
    return (
        <Container>
            <Products />
        </Container>
    );
};

export default ProductsPage;