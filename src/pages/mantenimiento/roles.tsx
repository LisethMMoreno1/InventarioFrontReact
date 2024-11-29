import React from 'react';
import { Container } from '@mui/material';
import Roles from '../../components/Manteniemiento/roles/roles';
import ListRoles from '../../components/Manteniemiento/roles/listRoles';

const RolesPage: React.FC = () => {
    return (
        <Container>
            <Roles />
            <ListRoles />
        </Container>
    );
};

export default RolesPage;
