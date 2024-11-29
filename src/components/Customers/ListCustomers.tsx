import React, { useEffect, useState } from 'react';

import { GridColDef } from '@mui/x-data-grid';
import { getCustomers } from '../../services/api/CustomersServices/customersService';
import DataGridComponent from '../componentesGenerales/Tabla/tabla.components';

const CustomerList = () => {
    const [customers, setCustomers] = useState<any[]>([]);


    const customerColumns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'typeOfIdentification', headerName: 'Type of Identification', width: 120,
            renderCell: ({ row }) => row?.typeOfIdentification?.name

        }, { field: 'identificationNumber', headerName: 'Número de Identificación', width: 180 },
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'phone', headerName: 'Teléfono', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'address', headerName: 'Dirección', width: 300 },
    ]

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await getCustomers();
                setCustomers(data);
            } catch (error) {
                console.error('Error al obtener los clientes:', error);
            }
        };

        fetchCustomers();
    }, []);

    return (
        <DataGridComponent
            rows={customers}
            columns={customerColumns}
        >
            Lista de Clientes
        </DataGridComponent>
    );
};

export default CustomerList;
