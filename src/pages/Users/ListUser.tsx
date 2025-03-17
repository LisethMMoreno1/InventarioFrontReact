import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import UserList from "../../components/users/userTable";

const UserLisPage: React.FC = () => {
  return (
    <Container>
      <UserList />
      <Outlet />
    </Container>
  );
};

export default UserLisPage;
