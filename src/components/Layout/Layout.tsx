import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AppRouter from "../../routes/AppRouter";
import AppBarContent from "./AppBarContent";
import ModuleList from "./modules/ModuleList";

const Layout: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const handleDrawerToggle = () => setOpen(!open);

  const handleModuleClick = (modulePath: string) => {
    setExpandedModule(expandedModule === modulePath ? null : modulePath);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Mi Aplicación
          </Typography>
          <AppBarContent onDrawerToggle={handleDrawerToggle} />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <ModuleList
            routes={AppRouter}
            expandedModule={expandedModule}
            handleModuleClick={handleModuleClick}
          />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
