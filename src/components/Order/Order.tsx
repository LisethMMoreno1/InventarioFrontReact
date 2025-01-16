import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import GenericModal from "../componentesGenerales/Modal/GenericModal";

const OrderForm: React.FC<{ formik: any }> = ({ formik }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: 4,
        borderRadius: 2,
        boxShadow: 5,
        width: "90%",
        mt: 3,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            margin="normal"
            id="orderDate"
            name="orderDate"
            label="Fecha de Orden"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.orderDate || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.orderDate && formik.errors.orderDate
                ? formik.errors.orderDate
                : ""
            }
            error={formik.touched.orderDate && Boolean(formik.errors.orderDate)}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Button variant="contained" color="primary" onClick={handleModalOpen}>
            Abrir Modal
          </Button>
          <GenericModal
            open={isModalOpen}
            onClose={handleModalClose}
            title="Detalles de la Orden"
            content={
              <Typography>
                Aquí puedes agregar información relevante sobre la orden.
              </Typography>
            }
            onConfirm={() => {
              console.log("Confirmar acción");
              handleModalClose();
            }}
            confirmText="Aceptar"
            cancelText="Cancelar"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export { OrderForm };
