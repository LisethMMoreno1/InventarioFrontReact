import { Container } from '@mui/material';
import React from 'react';
import ListPayment from '../../components/Payment/listPayment';

const PaymentListPage: React.FC = () => {
    return (
        <Container>
            <ListPayment />
        </Container>
    );
};

export default PaymentListPage;