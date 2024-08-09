"use client";

import React from 'react';
import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Colors } from '@/theme/colors';

interface SearchBarProps {
  searchQuery: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, handleSearchChange }) => {
  return (
    <Box display="flex" alignItems="center" style={{ backgroundColor: Colors.secondary, padding: 8, borderRadius: 12, marginRight: 4 }}>
      <SearchIcon />
      <InputBase
        placeholder="Buscar..."
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginLeft: 1, flex: 1 }}
      />
    </Box>
  );
};

export default SearchBar;