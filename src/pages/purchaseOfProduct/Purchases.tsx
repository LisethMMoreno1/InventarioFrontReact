import { Container } from '@mui/material';
import React from 'react';
import Purchase from '../../components/PurchaseOfProduct/purchases';

const PurchasePage: React.FC = () => {
    return (
        <Container>
            <Purchase />
        </Container>
    );
};

export default PurchasePage;