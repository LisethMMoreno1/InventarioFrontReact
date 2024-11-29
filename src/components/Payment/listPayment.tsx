import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { PaymentI } from '../../interfaces/Payment/Payment';
import { getPayment } from '../../services/api/PaymentService/paymentService';
import usePaymentStore from '../../stores/PaymentStore';
import DataGridComponent from '../componentesGenerales/Tabla/tabla.components';
import ButtonExport from '../Products/funcionExport/ButtonExportProduct';

const ListPayment: React.FC = () => {
    const { payments, setPayments } = usePaymentStore((state) => ({
        payments: state.payments,
        setPayments: state.setPayments
    }));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const fetchedPayments = await getPayment();
                setPayments(fetchedPayments);
            } catch (error) {
                console.error('Error fetching payments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, [setPayments]);
    
    const columns: GridColDef<PaymentI>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'subtotal', headerName: 'Sub-Total', type: 'number', width: 150 },
        { field: 'taxes', headerName: 'Impuestos', type: 'number', width: 150 },
        { field: 'shipping', headerName: 'Envío', type: 'number', width: 150 },
        { field: 'total', headerName: 'Total', type: 'number', width: 150 },
        { field: 'dateOfPayment', headerName: 'Fecha de pago', width: 380 },
        { field: 'paymentStatus', headerName: 'Estado Del Pago', width: 150 },
        { field: 'orderNumber', headerName: 'Número de Pedido', width: 150 },
        {
            field: 'bank', headerName: 'Banco', width: 200,
            renderCell: ({ row }) => row.bank ? row.bank.name : 'N/A'
        },
        {
            field: 'order', headerName: 'ID del pedido', width: 200,
            renderCell: ({ row }) => row.order ? row.order.id : 'N/A'
        },
        {
            field: 'customerIdentification', headerName: 'Identificación del cliente', width: 200,
            renderCell: ({ row }) => row.customer ? row.customer.identificationNumber : 'N/A'
        },
        {
            field: 'customerName', headerName: 'Nombre del cliente', width: 200,
            renderCell: ({ row }) => row.customer ? row.customer.name : 'N/A'
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 200,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 1 }}>
                    <Tooltip title="Edit">
                        <Button
                            color="primary"
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => handleEditClick(params.row)}
                            sx={{
                                border: 'none',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none',
                                },
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="View">
                        <Button
                            color="success"
                            size="small"
                            startIcon={<VisibilityIcon />}
                            onClick={() => handleViewClick(params.row)}
                            sx={{
                                border: 'none',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none',
                                },
                            }}
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            color="error"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDeleteClick(params.row)}
                            sx={{
                                border: 'none',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none',
                                },
                            }}
                        />
                    </Tooltip>
                </Box>
            ),
        },
    ];

    const handleEditClick = (payment: PaymentI) => {
        alert(`Edit payment: ${payment.subtotal}`);
    };

    const handleViewClick = (payment: PaymentI) => {
        alert(`View details of: ${payment.subtotal}`);
    };

    const handleDeleteClick = (payment: PaymentI) => {
        alert(`Delete payment: ${payment.subtotal}`);
    };

    return (
        <Box>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <DataGridComponent rows={payments} columns={columns}>
                    Lista de Pagos <ButtonExport />
                </DataGridComponent>
            )}
        </Box>
    );
};

export default ListPayment;
