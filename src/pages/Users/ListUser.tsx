import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import UserList from "../../components/users/UserList";

const UserLisPage: React.FC = () => {
  /*   const [refresh, setRefresh] = useState<boolean>(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };
 */
  return (
    <Container>
      {/*  <button onClick={handleRefresh}>Recargar lista</button> */}
      <UserList /* refresh={refresh} */ />
      <Outlet />
    </Container>
  );
};

export default UserLisPage;
