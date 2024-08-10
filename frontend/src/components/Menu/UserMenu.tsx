"use client";

import * as React from 'react';
import { Box, IconButton, Menu, MenuItem, Tooltip, Avatar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Colors } from '@/theme/colors';
import { useAuth } from '@/context/AuthContext';

interface UserMenuProps {
  userName?: string;
  anchorElUser: null | HTMLElement;
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
}

const settings = ['Sair'];

const UserMenu: React.FC<UserMenuProps> = ({ anchorElUser, handleOpenUserMenu, handleCloseUserMenu, userName }) => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    handleCloseUserMenu();
    router.push('/Login');
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={userName} src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem
              key={setting}
              onClick={setting === 'Sair' ? handleLogout : handleCloseUserMenu}
            >
              <Typography textAlign="center" style={{ color: Colors.white }}>{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      {userName && (
        <Typography paddingLeft={2} paddingRight={4} fontWeight={700} fontSize={17} color={Colors.secondary}>{userName}</Typography>
      )}
    </>
  );
};

export default UserMenu;