import React from 'react';
import { Container } from '@mui/material';
import TypeOfIdentification from '../../components/Manteniemiento/typeOfIdentification/typeOfIdentification';
import ListTypeOfIdentification from '../../components/Manteniemiento/typeOfIdentification/listTypeOfIdentification';

const TypeOfIdentificationPage: React.FC = () => {
  return (
    <Container>
      <TypeOfIdentification />
      < ListTypeOfIdentification />
    </Container>
  );
};

export default TypeOfIdentificationPage;
