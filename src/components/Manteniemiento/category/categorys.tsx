import { Button, Container, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Category } from "../../../interfaces/Category/category";
import AppRouter from "../../../routes/AppRouter";
import { postCategory } from "../../../services/api/CategoryService/CategoryService";
import { CategorySchema } from "../../../types/Mantenimiento/category/category";
import { showErrorAlert, showSuccessAlert } from "../../../Utils/alert";
import GeneralDashboard from "../../componentesGenerales/GeneralDashboard/GeneralDashboard";

const CreateCategory: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      categoryName: "",
      description: "",
    },
    validationSchema: CategorySchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const categoryRequest: Category = {
          id: 0,
          categoryName: values.categoryName,
          description: values.description,
        };

        await postCategory(categoryRequest);
        showSuccessAlert("Categoría creada exitosamente");
        resetForm();
      } catch (error) {
        showErrorAlert("Error al crear categoría");
      }
    },
  });

  return (
    <Container maxWidth="lg" sx={{ marginBottom: 2 }}>
      <GeneralDashboard title="Registrar Categoria" routes={AppRouter}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                value={formik.values.categoryName}
                onChange={formik.handleChange}
                margin="normal"
                id="categoryName"
                name="categoryName"
                label="Nombre de la Categoría"
                error={
                  formik.touched.categoryName &&
                  Boolean(formik.errors.categoryName)
                }
                helperText={
                  formik.touched.categoryName && formik.errors.categoryName
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                value={formik.values.description}
                onChange={formik.handleChange}
                margin="normal"
                id="description"
                name="description"
                label="Descripción"
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{ marginTop: 2 }}
              >
                Crear
              </Button>
            </Grid>
          </Grid>
        </form>
      </GeneralDashboard>
    </Container>
  );
};

export default CreateCategory;
