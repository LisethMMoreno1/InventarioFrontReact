import { Container } from '@mui/material';
import React from 'react';
import ListProducts from '../../components/Products/ListProduct';

const ListProductsPage: React.FC = () => {
    return (
        <Container>
            <ListProducts />
        </Container>
    );
};

export default ListProductsPage;