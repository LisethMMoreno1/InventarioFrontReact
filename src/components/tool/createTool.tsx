"use client";

import React from "react";
import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import ComponentFormInline from "../componentesGenerales/Form/componentFormInline";
import { toolsService } from "../../services/toolsService";
import { Tool } from "../../types/tool/tool.type";
import { createToolSchema } from "../../types/tool/createTool.schema";

const CreateTool: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      code: "",
      description: "",
    },
    validationSchema: createToolSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Se construye el payload con los campos editables
        const payload = values;
        const newTool = await toolsService.create(payload as Tool);
        console.log("Herramienta creada:", newTool);
        alert("Utilitario guardado de manera exitosa");
        onSuccess();
        resetForm();
      } catch (error) {
        console.error("Error al crear la herramienta:", error);
      }
    },
  });

  return (
    <ComponentFormInline
      title="Crear Utilitario"
      onSubmit={formik.handleSubmit}
      onCancel={() => formik.resetForm()}
      submitLabel="Crear Utilitario"
    >
      <form onSubmit={formik.handleSubmit} noValidate>
        <Grid container spacing={2}>
          {/* Primera fila: Nombre y Tipo */}
          <Grid item xs={8} sm={3}>
            <TextField
              label="Nombre"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={8} sm={3}>
            <TextField
              label="Tipo"
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          {/* Segunda fila: Código y Descripción */}
          <Grid item xs={8} sm={3}>
            <TextField
              label="Código"
              name="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={8} sm={3}>
            <TextField
              label="Descripción"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
            />
          </Grid>
        </Grid>
      </form>
    </ComponentFormInline>
  );
};

export default CreateTool;
