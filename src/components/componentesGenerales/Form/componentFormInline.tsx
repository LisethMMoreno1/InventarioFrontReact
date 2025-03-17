"use client";

import { Save as SaveIcon } from "@mui/icons-material";
import { Box, Button, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";

interface ComponentFormInlineProps {
  title: string;
  onSubmit: (values?: any) => void;
  submitLabel?: string;
  cancelLabel?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

const ComponentFormInline: React.FC<ComponentFormInlineProps> = ({
  title,
  onSubmit,
  submitLabel = "Guardar",
  isLoading = false,
  children,
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box>{children}</Box>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
        }}
      >
        <Tooltip title={submitLabel}>
          <Button
            onClick={() => onSubmit()}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            sx={{
              px: 3,
              borderRadius: 2,
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 10px rgba(0,0,0,0.2)",
              },
            }}
          >
            {submitLabel}
            {isLoading ? "Guardando..." : submitLabel}
          </Button>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default ComponentFormInline;
