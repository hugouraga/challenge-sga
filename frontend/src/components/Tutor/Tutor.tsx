"use client";

import React from 'react';
import { Avatar, Box, ListItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import { TutorialItemProps } from '../Tutorial/TutorialItemProps';
import { formatDateToBrazilian } from '@/utils/dateFormatter';
import { getAvatarImage } from '@/utils/random-icon.images';

const Tutor: React.FC<TutorialItemProps> = ({ index, tutor, selected, onClick }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const avatarImage = getAvatarImage(index);
  const truncatedName = isSmallScreen ? tutor.name.slice(0, 12) + '...' : tutor.name;

  return (
    <ListItem
      key={index}
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: selected ? '#f1f5fb' : 'transparent',
        borderRadius: '24px',
        cursor: 'pointer',
        justifyContent: 'space-between',
        overflow: 'hidden',
        minWidth: '600px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'space-between', minWidth: '0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '150px' }}>
          <Avatar
            alt="Icone usuário"
            src={avatarImage}
            sx={{ width: 40, height: 40 }}
          />
          <Typography fontSize={17} fontWeight={600} sx={{ marginLeft: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {truncatedName}
          </Typography>
        </Box>
        <Typography fontSize={15} fontWeight={400} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: '150px' }}>
          {tutor.email}
        </Typography>
        <Typography fontSize={15} marginRight={6} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: '120px' }}>
          {formatDateToBrazilian(tutor.createdAt)}
        </Typography>
      </Box>
    </ListItem>
  );
};

export default Tutor;