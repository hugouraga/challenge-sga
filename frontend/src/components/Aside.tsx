"use client";

import React, { ReactNode } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { Colors } from '@/theme/colors';

interface AsideProps {
  children: ReactNode;
  showMore?: () => void;
  canShowMore?: boolean;
  loading?: boolean;
}

const Aside: React.FC<AsideProps> = ({ children, showMore, canShowMore, loading }) => {
  return (
    <Box sx={{ flex: 1, padding: '16px', height: 'calc(65vh)', position: 'relative' }}>
      <Box sx={{ 
          padding: '24px 16px 16px 13px', 
          backgroundColor: Colors.secondary, 
          borderRadius: '24px', 
          height: '100%', 
          overflowY: 'auto',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}>
        <Typography style={{fontSize: 28, marginLeft: 6}} fontWeight={600} gutterBottom marginBottom={1}> 
          Tutorias
        </Typography>

        {children}

        {canShowMore && (
          <Button
            onClick={showMore}
            variant="contained"
            color="primary"
            sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3rem' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Ver mais'}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Aside;