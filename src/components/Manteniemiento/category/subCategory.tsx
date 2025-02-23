import {
    Button,
    Container,
    Grid,
    MenuItem,
    TextField
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { SubCategory } from "../../../interfaces/SubCategory/subCategory";
import AppRouter from "../../../routes/AppRouter";
import {
    getCategory,
    postSubCategory,
} from "../../../services/api/CategoryService/CategoryService";
import useCategorysStore from "../../../stores/Categorys";
import { SubCategorySchema } from "../../../types/Mantenimiento/category/category";
import { showErrorAlert, showSuccessAlert } from "../../../Utils/alert";
import GeneralDashboard from "../../componentesGenerales/GeneralDashboard/GeneralDashboard";

const CreateSubCategory: React.FC = () => {
  const { categories, setCategories } = useCategorysStore((state) => ({
    categories: state.categories,
    setCategories: state.setCategories,
  }));

  const formik = useFormik({
    initialValues: {
      subcategoryName: "",
      description: "",
      categoryId: "",
    },
    validationSchema: SubCategorySchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const subCategoryRequest: SubCategory = {
          id: 0,
          subcategoryName: values.subcategoryName,
          description: values.description,
          categoryId: Number(values.categoryId),
        };

        await postSubCategory(subCategoryRequest);
        showSuccessAlert("Subcategoría creada exitosamente");
        resetForm();
      } catch (error) {
        showErrorAlert("Error al crear subcategoría");
      }
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategory();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategories();
  }, [setCategories]);

  return (
    <Container maxWidth="lg">
      <GeneralDashboard title="Registrar Detalle de Orden" routes={AppRouter}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                value={formik.values.subcategoryName}
                onChange={formik.handleChange}
                margin="normal"
                id="subcategoryName"
                name="subcategoryName"
                label="Nombre de la Subcategoría"
                error={
                  formik.touched.subcategoryName &&
                  Boolean(formik.errors.subcategoryName)
                }
                helperText={
                  formik.touched.subcategoryName &&
                  formik.errors.subcategoryName
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
              <TextField
                fullWidth
                select
                value={formik.values.categoryId}
                onChange={formik.handleChange}
                margin="normal"
                id="categoryId"
                name="categoryId"
                label="Categoría"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </TextField>
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

export default CreateSubCategory;
