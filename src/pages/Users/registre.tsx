import React from 'react';
import { Container } from '@mui/material';
import Registre from '../../components/users/Registre/registre';
import { Outlet } from 'react-router-dom';

const RegistrePage: React.FC = () => {
  return (
    <Container>
      <Registre/>
      <Outlet /> 
    </Container>
  );
};

export default RegistrePage;
