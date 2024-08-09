
import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, IconButton, Skeleton } from '@mui/material';

const SkeletonTutorial: React.FC = () => {
  return (
    <>
      {Array.from(new Array(6)).map((_, index) => (
        <ListItem key={index} sx={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
          <ListItemAvatar>
            <Skeleton variant="circular" width={40} height={40} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton variant="text" width="60%" />}
            secondary={<Skeleton variant="text" width="40%" />}
          />
          <IconButton>
            <Skeleton variant="circular" width={24} height={24} />
          </IconButton>
        </ListItem>
      ))}
    </>
  );
};

export default SkeletonTutorial;