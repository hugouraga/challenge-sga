"use client";

import * as React from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NavButton from './NavButton';

interface NavMenuProps {
  anchorElNav: null | HTMLElement;
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: () => void;
}

const pages = ['Inicio'];

const NavMenu: React.FC<NavMenuProps> = ({ anchorElNav, handleOpenNavMenu, handleCloseNavMenu }) => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
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
        <NavButton href="/Inicio">Inicios</NavButton>
        {/* <NavButton href="/Tutoriais">Tutoriais</NavButton> hot fix with me */}
      </Menu>
    </Box>
  );
};

export default NavMenu;