import { Container } from '@mui/material';
import React from 'react';
import SubCategoryList from '../../components/Manteniemiento/category/listSubcategory';
import CreateSubCategory from '../../components/Manteniemiento/category/subCategory';

const SubCategoryPages: React.FC = () => {
    return (
        <Container >
            <CreateSubCategory />
            <  SubCategoryList />
        </Container>
    );
};

export default SubCategoryPages;
