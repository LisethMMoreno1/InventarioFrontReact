import React from "react";
import { Box, Button, CircularProgress, ButtonProps } from "@mui/material";

interface ActionButtonProps extends ButtonProps {
  onClick: () => void;
  loading?: boolean;
  text: string;
  loadingText?: string;
  startIcon?: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  loading = false,
  text,
  loadingText = "Cargando...",
  disabled = false,
  startIcon,
  color = "primary",
  variant = "contained",
  ...props
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
      <Button
        onClick={onClick}
        variant={variant}
        color={color}
        disabled={loading || disabled}
        startIcon={
          loading ? <CircularProgress size={20} color="inherit" /> : startIcon
        }
        sx={{
          textTransform: "none",
          py: 1,
          px: 4,
          "&:hover": {
            bgcolor: `${color}.dark`,
          },
        }}
        {...props}
      >
        {loading ? loadingText : text}
      </Button>
    </Box>
  );
};

export default ActionButton;
