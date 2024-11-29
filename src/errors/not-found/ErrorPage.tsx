import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/login');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '93vh',
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                padding: 3
            }}
        >
            <Typography variant="h1" component="h1" color="error">
                404
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom>
                Página no encontrada
            </Typography>
            <Typography variant="body1" component="p">
                La página que busca no existe.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoHome}
                sx={{ marginTop: 2 }}
            >
                Ir a Inicio
            </Button>
        </Box>
    );
};

export default ErrorPage;
