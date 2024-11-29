import { Container } from '@mui/material';
import React from 'react';
import CustomerList from '../../components/Customers/ListCustomers';

const ListCustomersPages: React.FC = () => {
  return (
    <Container>
      <CustomerList/>
    </Container>
  );
};

export default ListCustomersPages;
