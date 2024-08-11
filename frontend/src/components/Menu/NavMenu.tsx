"use client";

import * as React from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface NavMenuProps {
  anchorElNav: null | HTMLElement;
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: () => void;
  onMenuClick: (section: 'tutores' | 'tutoriais') => void;  // Altere o tipo de string para 'tutores' | 'tutoriais'
}

const NavMenu: React.FC<NavMenuProps> = ({ anchorElNav, handleOpenNavMenu, handleCloseNavMenu, onMenuClick }) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <MenuItem onClick={() => { onMenuClick('tutores'); handleCloseNavMenu(); }}>
          Inicio
        </MenuItem>
        <MenuItem onClick={() => { onMenuClick('tutoriais'); handleCloseNavMenu(); }}>
          Tutoriais
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavMenu;