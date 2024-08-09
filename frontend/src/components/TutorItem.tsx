"use client";

import React from 'react';
import { Avatar, Box, ListItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import { TutorialItemProps } from './TutorialItemProps';
import { formatDateToBrazilian } from '@/utils/dateFormatter';
import { getAvatarImage } from '@/utils/random-icon.images';

const TutorialItem: React.FC<TutorialItemProps> = ({ index, tutor, selected, onClick }) => {
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
        overflowX: 'auto'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'space-between', minWidth: '400px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }} minWidth={150}>
          <Avatar
            alt="Icone usuário"
            src={avatarImage}
            sx={{ width: 40, height: 40 }}
          />
          <Typography fontSize={17} fontWeight={600} sx={{ marginLeft: '16px' }}>
            {truncatedName}
          </Typography>
        </Box>
        <Typography fontSize={15} fontWeight={400} minWidth={150}>
          {tutor.email}
        </Typography>
        {!isSmallScreen && (
          <Typography fontSize={15} marginRight={6}>
            {formatDateToBrazilian(tutor.createdAt)}
          </Typography>
        )}
      </Box>
    </ListItem>
  );
};

export default TutorialItem;