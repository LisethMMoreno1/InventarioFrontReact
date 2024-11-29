import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, MenuItem } from '@mui/material';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { StyledMenu } from '../../styles/StyledMenu';

type AppBarContentProps = {
  onDrawerToggle: () => void;
};

const AppBarContent = ({ onDrawerToggle }: AppBarContentProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);  // Establece el botón de cuenta como el ancla del menú
  };

  const handleClose = () => {
    setAnchorEl(null);  // Cierra el menú
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" onClick={onDrawerToggle} edge="start" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Mi Aplicación
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="large" onClick={handleMenu} color="inherit">
            <AccountCircle />
          </IconButton>
          <StyledMenu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}   // El menú se abre si anchorEl no es null
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Usuario Conectado</MenuItem>
            <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
            <MenuItem onClick={handleClose}>Soporte</MenuItem>
          </StyledMenu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarContent;
