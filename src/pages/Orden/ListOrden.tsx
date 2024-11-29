import { Container } from '@mui/material';
import React from 'react';
import ListOrden from '../../components/OrdenDatails/listOrderDetails';

const ListOrdenPage: React.FC = () => {
    return (
        <Container>
            <ListOrden />
        </Container>
    );
};

export default ListOrdenPage;