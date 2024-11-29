import { Tooltip, IconButton } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import React from "react";

interface ViewButtonProps {
  onClick: () => void;
}

const ViewButton: React.FC<ViewButtonProps> = ({ onClick }) => (
  <Tooltip title="Ver">
    <IconButton
      aria-label="ver"
      size="large"
      onClick={onClick}
      sx={{
        color: "info.main",
        "&:hover": {
          backgroundColor: "info.light",
          color: "info.contrastText",
        },
      }}
    >
      <VisibilityOutlinedIcon fontSize="inherit" />
    </IconButton>
  </Tooltip>
);

export default ViewButton;
