import {
  Box,
  CircularProgress,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toolsService } from "../../services/toolsService";
import { Tool } from "../../types/tool/tool.type";
import { User } from "../../types/users/user.types";
import { getUsers } from "../../services/userService";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [toolsIdentification, setToolsIdentification] = useState<Tool[]>([]);
  const [toolsGender, setToolsGender] = useState<Tool[]>([]);
  const [filterIdentification, setFilterIdentification] = useState<string>("");
  const [filterGender, setFilterGender] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await getUsers();
        setUsers(userData);

        const identificationData = await toolsService.getToolsByCode("CC");
        setToolsIdentification(identificationData);

        const genderData = await toolsService.getToolsByCode("GG");
        setToolsGender(genderData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      (filterIdentification ? user.tool.code === filterIdentification : true) &&
      (filterGender ? user.tool.code === filterGender : true)
  );

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Usuarios
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          select
          label="Filtrar por Tipo de Identificación"
          value={filterIdentification}
          onChange={(e) => setFilterIdentification(e.target.value)}
          fullWidth
        >
          <MenuItem value="">Todos</MenuItem>
          {toolsIdentification.map((tool) => (
            <MenuItem key={tool.id} value={tool.code}>
              {tool.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Filtrar por Género"
          value={filterGender}
          onChange={(e) => setFilterGender(e.target.value)}
          fullWidth
        >
          <MenuItem value="">Todos</MenuItem>
          {toolsGender.map((tool) => (
            <MenuItem key={tool.id} value={tool.code}>
              {tool.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Tipo de Identificación</TableCell>
                <TableCell>Género</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id_user}>
                  <TableCell>{user.id_user}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.tool?.name}</TableCell>
                  <TableCell>
                    {user.tool?.code === "GG" ? user.tool.name : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default UserList;
