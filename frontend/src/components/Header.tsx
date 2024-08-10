"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavMenu from './NavMenu';
import UserMenu from './UserMenu';
import NavButton from './NavButton';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  onMenuClick: (screen: 'tutores' | 'tutoriais') => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
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
    <AppBar
      position="static"
      style={{
        borderStyle: 'none',
        boxShadow: 'none',
        marginBottom: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 12,
      }}
    >
      <Toolbar>
        <NavMenu
          anchorElNav={anchorElNav}
          handleOpenNavMenu={handleOpenNavMenu}
          handleCloseNavMenu={handleCloseNavMenu}
        />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#"
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
          <NavButton href="#" onClick={() => onMenuClick('tutores')}>
            Inicio
          </NavButton>
          <NavButton href="#" onClick={() => onMenuClick('tutoriais')}>
            Tutoriais
          </NavButton>
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
};

export default Header;