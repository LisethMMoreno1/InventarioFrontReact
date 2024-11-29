import { Container } from "@mui/material";
import React from "react";
import CreateCategory from "../../components/Manteniemiento/category/categorys";
import CategoryList from "../../components/Manteniemiento/category/listCategorys";
import { Outlet } from "react-router-dom";

const CategoryPages: React.FC = () => {
  return (
    <Container>
      <CreateCategory />
      <CategoryList />
      <Outlet />
    </Container>
  );
};

export default CategoryPages;
