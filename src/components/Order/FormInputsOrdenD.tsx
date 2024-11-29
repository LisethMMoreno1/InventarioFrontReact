import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SubCategory } from '../../interfaces/SubCategory/subCategory';
import useCategorysStore from '../../stores/Categorys';

const FormInputsOrden: React.FC = () => {
    const { categories, subcategories, fetchCategoriesAndSubCategories } = useCategorysStore((state) => ({
        categories: state.categories,
        subcategories: state.subcategories,
        fetchCategoriesAndSubCategories: state.fetchCategoriesAndSubCategories,
    }));

    const [selectedCategory, setSelectedCategory] = useState<number | ''>('');
    const [filteredSubcategories, setFilteredSubcategories] = useState<SubCategory[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchCategoriesAndSubCategories();
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [fetchCategoriesAndSubCategories]);


    /*  Filtro la Categori y sus SubCategoria */
    useEffect(() => {

        if (selectedCategory !== "") {
            const filtered = subcategories.filter(subcategory =>
                subcategory.category?.id === selectedCategory
            );

            setFilteredSubcategories(filtered);
        } else {
            setFilteredSubcategories(subcategories);
        }
    }, [selectedCategory, subcategories]);




    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    fullWidth
                    margin="normal"
                    id="brand"
                    name="brand"
                    label="Marca"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="yearOfManufacture"
                    name="yearOfManufacture"
                    label="Año de fabricación"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="plateNumber"
                    name="plateNumber"
                    label="Número de placa"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="category-label">Categoría</InputLabel>
                    <Select
                        labelId="category-label"
                        id="categoryId"
                        name="categoryId"
                        value={selectedCategory}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            setSelectedCategory(value);
                        }}
                        label="Categoría"
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="subcategory-label">Sub-Categoría</InputLabel>
                    <Select
                        labelId="subcategory-label"
                        id="subcategoryId"
                        name="subcategoryId"
                        label="Sub-Categoría"
                    >
                        {filteredSubcategories.map((subcategory) => (
                            <MenuItem key={subcategory.id} value={subcategory.id}>
                                {subcategory.subcategoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    margin="normal"
                    id="orderStatusId"
                    name="orderStatusId"
                    label="Estado del pedido"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TextField
                    fullWidth
                    margin="normal"
                    id="descriptionOfProblem"
                    name="descriptionOfProblem"
                    label="Descripción del problema"
                    type="text"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    id="dateOfEntry"
                    name="dateOfEntry"
                    label="Fecha de entrada"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
        </Grid>
    );
};

export default FormInputsOrden;
