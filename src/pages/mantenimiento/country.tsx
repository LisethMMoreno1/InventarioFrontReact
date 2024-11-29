import { Container } from '@mui/material';
import React from 'react';
import Country from '../../components/Manteniemiento/country/country';
import ListCountry from '../../components/Manteniemiento/country/listCountry';

const CountryPage: React.FC = () => {
    return (
        <Container>
            <Country />
            <ListCountry />
        </Container>
    );
};

export default CountryPage;
