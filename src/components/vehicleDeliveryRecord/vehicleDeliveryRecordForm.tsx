import { Box, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";

interface VehicleDeliveryRecordFormProps {
  formik: FormikProps<{
    deliveryDate: string;
    completedRepairs: string;
    customerSatisfaction: boolean;
  }>;
}

const VehicleDeliveryRecordForm: React.FC<VehicleDeliveryRecordFormProps> = ({
  formik,
}) => {
  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <TextField
        fullWidth
        label="Fecha de Entrega"
        type="date"
        InputLabelProps={{ shrink: true }}
        {...formik.getFieldProps("deliveryDate")}
        error={
          formik.touched.deliveryDate && Boolean(formik.errors.deliveryDate)
        }
        helperText={formik.touched.deliveryDate && formik.errors.deliveryDate}
      />

      <TextField
        fullWidth
        label="Reparaciones Completadas"
        {...formik.getFieldProps("completedRepairs")}
        error={
          formik.touched.completedRepairs &&
          Boolean(formik.errors.completedRepairs)
        }
        helperText={
          formik.touched.completedRepairs && formik.errors.completedRepairs
        }
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formik.values.customerSatisfaction}
            {...formik.getFieldProps("customerSatisfaction")}
          />
        }
        label="Satisfacción del Cliente"
      />
    </Box>
  );
};

export default VehicleDeliveryRecordForm;
