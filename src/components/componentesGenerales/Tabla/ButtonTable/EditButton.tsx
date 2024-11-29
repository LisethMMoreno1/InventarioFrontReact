import { Tooltip, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import React from "react";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => (
  <Tooltip title="Editar">
    <IconButton
      aria-label="editar"
      size="large"
      onClick={onClick}
      sx={{
        color: "warning.main",
        "&:hover": {
          backgroundColor: "warning.light",
          color: "warning.contrastText",
        },
      }}
    >
      <EditOutlinedIcon fontSize="inherit" />
    </IconButton>
  </Tooltip>
);

export default EditButton;
