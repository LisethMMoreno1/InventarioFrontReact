import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface UserModalProps {
  open: boolean;
  handleClose: () => void;
  selectedUser: {
    firstName: string;
    middleName?: string;
    firstLastName: string;
    secondLastName?: string;
    typeOfIdentification?: { name: string };
    identificationNumber: string;
    phoneNumber: string;
    email: string;
    role?: { typeOfRole: string };
    genre?: { genre: string };
  } | null;
}

const UserModal: React.FC<UserModalProps> = ({ open, handleClose, selectedUser }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="user-details-modal" aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        {selectedUser && (
          <>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                margin: '0 auto 20px',
                bgcolor: 'primary.main',
                fontSize: '3rem',
              }}
            >
              {selectedUser.firstName[0]}
            </Avatar>
            <Typography id="user-details-modal" variant="h6" component="h2" gutterBottom align="center">
              Detalles del Usuario
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Nombre completo:</strong> {`${selectedUser.firstName} ${selectedUser.middleName || ''} ${selectedUser.firstLastName} ${selectedUser.secondLastName || ''}`}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Tipo de identificación:</strong> {selectedUser.typeOfIdentification?.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Número de identificación:</strong> {selectedUser.identificationNumber}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Teléfono:</strong> {selectedUser.phoneNumber}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {selectedUser.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Rol:</strong> {selectedUser.role?.typeOfRole}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Género:</strong> {selectedUser.genre?.genre}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default UserModal;
