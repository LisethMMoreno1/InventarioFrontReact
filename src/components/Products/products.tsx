import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import useCategorysStore from "../../stores/Categorys";
import { getCategory } from "../../services/api/CategoryService/CategoryService";
import { useProductsStore } from "../../stores/ProductsStore";
import { productSchema } from "../../types/Products/productsSchema";
import { ProductI } from "../../interfaces/Products/product";
import { useFormik } from "formik";
import { showErrorAlert, showSuccessAlert } from "../../Utils/alert";
import { postProduct } from "../../services/api/ProductService/productService";
import { useNavigate } from "react-router-dom";

const Products: React.FC = () => {
  const navigate = useNavigate();

  useProductsStore((state) => ({
    setProducts: state.setProducts,
  }));

  const { categories, setCategories } = useCategorysStore((state) => ({
    categories: state.categories,
    setCategories: state.setCategories,
  }));

  const formik = useFormik({
    initialValues: {
      nameofProduct: "",
      description: "",
      price: "",
      quantityAvailable: "",
      categoryId: "",
    },
    validationSchema: productSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const productRequest: ProductI = {
          id: 0,
          nameofProduct: values.nameofProduct,
          description: values.description,
          price: parseFloat(values.price),
          quantityAvailable: parseFloat(values.quantityAvailable),
          categoryId: Number(values.categoryId),
        };
        await postProduct(productRequest);
        showSuccessAlert("Producto creado exitosamente");
        resetForm();
        navigate("/Producto/Lista%20de%20Productos");
      } catch (error) {
        showErrorAlert("Error al crear producto");
      }
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategory();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error al obtener categorías:  ", error);
      }
    };

    fetchCategories();
  }, [setCategories]);

  return (
    <Container maxWidth={"lg"}>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Registro de Producto
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                id="nameofProduct"
                name="nameofProduct"
                label="Nombre del Producto"
                value={formik.values.nameofProduct}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.nameofProduct && formik.errors.nameofProduct
                    ? formik.errors.nameofProduct
                    : ""
                }
                error={
                  formik.touched.nameofProduct &&
                  Boolean(formik.errors.nameofProduct)
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                id="description"
                name="description"
                label="Descripción"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.description && formik.errors.description
                    ? formik.errors.description
                    : ""
                }
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                id="price"
                name="price"
                label="Precio"
                type="text"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.price && formik.errors.price
                    ? formik.errors.price
                    : ""
                }
                error={formik.touched.price && Boolean(formik.errors.price)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                margin="normal"
                id="quantityAvailable"
                name="quantityAvailable"
                label="Cantidad Disponible"
                value={formik.values.quantityAvailable}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.quantityAvailable &&
                  formik.errors.quantityAvailable
                    ? formik.errors.quantityAvailable
                    : ""
                }
                error={
                  formik.touched.quantityAvailable &&
                  Boolean(formik.errors.quantityAvailable)
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="categoryId">Categoría</InputLabel>
                <Select
                  labelId="categoryId"
                  id="categoryId"
                  name="categoryId"
                  value={formik.values.categoryId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Categoría"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.categoryName}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.categoryId && formik.errors.categoryId ? (
                  <FormHelperText error>
                    {formik.errors.categoryId}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Registrar
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Products;
