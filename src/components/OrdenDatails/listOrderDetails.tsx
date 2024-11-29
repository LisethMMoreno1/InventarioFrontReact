import { CircularProgress, Container } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Orden } from '../../interfaces/Orden/orden';
import { getOrders } from '../../services/api/OrdenService/ordenService';
import DataGridComponent from '../componentesGenerales/Tabla/tabla.components';

const ListOrden = () => {
    const [orders, setOrders] = useState<Orden[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await getOrders();
                setOrders(fetchedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const columns: GridColDef<Orden>[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'entryDate', headerName: 'Fecha de ingreso', width: 380 },
        { field: 'orderNumber', headerName: 'Número de Orden', width: 250 },
    ];

    return (
        <Container maxWidth="lg">
            {loading ? (
                <CircularProgress />
            ) : (
                <DataGridComponent rows={orders} columns={columns}>
                    Lista de Ordenes
                </DataGridComponent>
            )}
        </Container>
    );
};

export default ListOrden;
