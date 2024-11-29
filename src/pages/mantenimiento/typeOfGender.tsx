import React from 'react';
import { Container } from '@mui/material';
import TypeOfGender from '../../components/Manteniemiento/typeOfGender/typeOfGender';
import ListTypeOfGender from '../../components/Manteniemiento/typeOfGender/listTypeOfGender';

const TypeOfGenderPage: React.FC = () => {
    return (
        <Container>
            <TypeOfGender />
            <ListTypeOfGender />
        </Container>
    );
};

export default TypeOfGenderPage;
