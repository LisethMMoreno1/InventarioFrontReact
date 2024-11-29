import { Box, Container } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import useCountryStore from '../../../stores/Country';
import DataGridComponent from '../../componentesGenerales/Tabla/tabla.components';

interface CombinedData {
    id: number;
    Department: string;
    codeDepartment: string;
    cities: string;
    codeCities: string;
}

const ListCountry: React.FC = () => {
    useCountryStore(state => ({
        country: state.country,
        setCountry: state.setCountry,
    }));

    const [combinedData] = useState<CombinedData[]>([]);



    const columns: GridColDef[] = [
        { field: 'Department', headerName: 'Departamento', width: 250 },
        { field: 'codeDepartment', headerName: 'Código Departamento', width: 150 },
        { field: 'cities', headerName: 'Ciudad', width: 250 },
        { field: 'codeCities', headerName: 'Código Ciudad', width: 150 },

    ];



    return (
        <Container maxWidth="lg">
            <Box mt={5}>
                <DataGridComponent rows={combinedData} columns={columns} >
                    Lista de Cuidad y Departamento
                </DataGridComponent>
            </Box>
        </Container>
    );
};

export default ListCountry;
