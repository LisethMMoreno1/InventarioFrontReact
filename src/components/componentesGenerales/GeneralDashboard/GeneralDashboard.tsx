import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import React from "react";
import { RouteType } from "../../../routes/route";
import { useLocation } from "react-router-dom";

export interface GeneralDashboardProps {
  title?: string;
  routes: RouteType[];
  children: React.ReactNode;
  sx?: SxProps<Theme>; // Cambié `React.ReactNode` por `SxProps<Theme>`
}

const GeneralDashboard: React.FC<GeneralDashboardProps> = ({
  title,
  routes,
  children,
  sx,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const pathSegments = currentPath.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    return {
      label: segment.replace(/%20/g, " "), // Decodificar %20 a espacio
      href,
    };
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 2, px: 0 }}>
      {/* Breadcrumbs */}
      <Box mb={1}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Inicio
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <Link
              key={index}
              color={
                index === breadcrumbs.length - 1 ? "text.primary" : "inherit"
              }
              href={crumb.href}
              underline="hover"
            >
              {crumb.label}
            </Link>
          ))}
        </Breadcrumbs>
      </Box>

      {/* Title Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          p: 1.5,
          backgroundColor: "#0f2027",
          borderRadius: 1,
          color: "white",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          p: 2,
          borderRadius: 1,
          boxShadow: 2,
          height: "auto",
          maxHeight: "50vh",
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default GeneralDashboard;
