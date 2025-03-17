"use client";

import React from "react";
import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { createToolSchema } from "../../types/tool/createTool.schema";
import { Tool } from "../../types/tool/tool.types";

interface ToolFormProps {
  initialValues: {
    name: string;
    type: string;
    code: string;
    description: string;
  };
  onSubmit: (values: any) => void;
  toolOptions?: Tool[];
}

const ToolForm: React.FC<ToolFormProps> = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema: createToolSchema,
    onSubmit: (values) => {
      console.log("Valores enviados:", values);
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            required // ✅ Campo obligatorio
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Tipo"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.type && Boolean(formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
            fullWidth
            required // ✅ Campo obligatorio
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Código"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
            fullWidth
            required // ✅ Campo obligatorio
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Descripción"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            fullWidth
            multiline
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ToolForm;
