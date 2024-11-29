import React, { useState } from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Modal, Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FormInputs from '../../Order/FormInputsOrdenD';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
};

const closeButtonStyle = {
    position: 'absolute' as 'absolute',
    top: 8,
    right: 8,
};

const OrderIconWithModal: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = () => {
        console.log('Datos guardados:');
        handleClose();
    };

    return (
        <div>
            <AssignmentIcon onClick={handleOpen} style={{ cursor: 'pointer' }} />
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <IconButton
                        onClick={handleClose}
                        sx={closeButtonStyle}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <FormInputs />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        sx={{ mt: 2 }}
                    >
                        Guardar
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default OrderIconWithModal;
