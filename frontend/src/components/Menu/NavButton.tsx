"use client";

// components/NavButton.tsx
import React, { ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';
import Link from 'next/link';
import { Colors } from '@/theme/colors';

interface NavButtonProps extends ButtonProps {
  href: string;
  children: ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ href, children, ...props }) => {
  return (
    <Link href={href} passHref style={{textDecoration: 'none', borderStyle: 'none' }}>
      <Button sx={{  color: Colors.white, display: 'block'}}
          style={{ fontSize: 18}} {...props}>
        {children}
      </Button>
    </Link>
  );
};

export default NavButton;