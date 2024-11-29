import { Container } from '@mui/material';
import React from 'react';
import ListPurchase from '../../components/PurchaseOfProduct/listpurchases';

const ListPurchasePage: React.FC = () => {
    return (
        <Container>
            <ListPurchase />
        </Container>
    );
};

export default ListPurchasePage;