import { Tooltip, IconButton } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import React from "react";

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => (
  <Tooltip title="Eliminar">
    <IconButton
      aria-label="eliminar"
      size="large"
      onClick={onClick}
      sx={{
        color: "error.main",
        "&:hover": {
          backgroundColor: "error.light",
          color: "error.contrastText",
        },
      }}
    >
      <DeleteForeverOutlinedIcon fontSize="inherit" />
    </IconButton>
  </Tooltip>
);

export default DeleteButton;
