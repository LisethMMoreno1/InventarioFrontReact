import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  loading,
  text,
  loadingText = "Cargando...",
  disabled = false,
  startIcon,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
      <Button
        onClick={onClick}
        type="submit"
        variant="contained"
        sx={{
          bgcolor: "primary.main",
          color: "white",
          "&:hover": {
            bgcolor: "primary.dark",
          },
          textTransform: "none",
          py: 1,
          px: 4,
        }}
        startIcon={
          loading ? <CircularProgress size={24} color="inherit" /> : startIcon
        } 
        disabled={loading || disabled}
      >
        {loading ? loadingText : text}
      </Button>
    </Box>
  );
};

export default ActionButton;
