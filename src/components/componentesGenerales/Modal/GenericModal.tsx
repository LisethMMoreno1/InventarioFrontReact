import React from "react";
import { Box, Modal, Typography, Button } from "@mui/material";
import ActionButton from "../Boton/ActionButton";


const GenericModal: React.FC<GenericModalProps> = ({
  open,
  onClose,
  title,
  content,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  loading = false,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {title && (
          <Typography id="modal-title" variant="h6" mb={2}>
            {title}
          </Typography>
        )}
        <Box id="modal-description" mb={3}>
          {content}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button onClick={onClose} variant="outlined">
            {cancelText}
          </Button>
          {onConfirm && (
            <ActionButton
              onClick={onConfirm}
              text={confirmText}
              loading={loading}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default GenericModal;
