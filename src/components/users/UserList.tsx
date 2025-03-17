import React from "react";
import UserTable from "./userTable";
import EditUserModal from "./userEditModal";

const UserList: React.FC = () => {
  return (
    <>
      <UserTable />
      <EditUserModal />
    </>
  );
};

export default UserList;
