"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AdbIcon from '@mui/icons-material/Adb';
import NavMenu from './NavMenu';
import UserMenu from './UserMenu';
import NavButton from './NavButton';
import { useAuth } from '@/context/AuthContext';

const pages = ['Turoriais', 'Tutorias'];

const Header: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { user } = useAuth();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ borderStyle: 'none', boxShadow: 'none', marginBottom: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 12 }}>
      <Toolbar >
        <NavMenu
          anchorElNav={anchorElNav}
          handleOpenNavMenu={handleOpenNavMenu}
          handleCloseNavMenu={handleCloseNavMenu}
        />
        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          SGA
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <NavButton href="/Home">Inicio</NavButton>
          {/* <NavButton href="/Tutoriais">Tutoriais</NavButton> */}
        </Box>

        <UserMenu
          userName={user?.name}
          anchorElUser={anchorElUser}
          handleOpenUserMenu={handleOpenUserMenu}
          handleCloseUserMenu={handleCloseUserMenu}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Header;