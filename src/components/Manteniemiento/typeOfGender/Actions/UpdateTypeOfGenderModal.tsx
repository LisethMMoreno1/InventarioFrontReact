import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import UpdateTypeOfGender from './UpdateTypeOfGender';

interface UpdateTypeOfGenderModalProps {
    open: boolean;
    onClose: () => void;
    typeOfGenderId: number;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
};


const UpdateTypeOfGenderModal: React.FC<UpdateTypeOfGenderModalProps> = ({ open, onClose, typeOfGenderId }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ ...style, width: 500 }}>
                <UpdateTypeOfGender id={typeOfGenderId} /> 
                <Button onClick={onClose} color="primary" variant="contained">
                    Close
                </Button>
            </Box>
        </Modal>
    );
};



export default UpdateTypeOfGenderModal;
