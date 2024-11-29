import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import FormInputsOrden from '../Order/FormInputsOrdenD';

const OrderDetails: React.FC = () => {
/*     const navigate = useNavigate(); 
 */

    return (
        <Container maxWidth={"lg"}>
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 5,
                    width: '120%'
                }}
            >
                <Typography variant="h4" component="h2" gutterBottom>
                    Registro de detalles de orden
                </Typography>
                <FormInputsOrden />
                <Box mt={3}>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Registrar
                    </Button>
                </Box>

            </Box>
        </Container>
    );
};

export default OrderDetails;
