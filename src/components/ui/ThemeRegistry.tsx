'use client';

import { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A237E',
      light: '#3949AB',
      dark: '#0D1445',
    },
    secondary: {
      main: '#FF6B35',
      light: '#FF8A65',
      dark: '#E64A19',
    },
    success: {
      main: '#00897B',
    },
    background: {
      default: '#F8F9FA',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#4A4A4A',
    },
  },
  typography: {
    fontFamily: 'var(--font-inter), sans-serif',
    h1: { fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 700 },
    h2: { fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 700 },
    h3: { fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 600 },
    h4: { fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 600 },
    h5: { fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 600 },
    h6: { fontFamily: 'var(--font-poppins), sans-serif', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.9rem',
        },
      },
    },
  },
});

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
