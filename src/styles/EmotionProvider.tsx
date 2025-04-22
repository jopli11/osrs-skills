"use client";

import { ThemeProvider } from '@emotion/react';
import { ReactNode, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const lightTheme = {
  colors: {
    primary: '#DAA520',
    background: '#ffffff',
    foreground: '#000000',
    card: '#f9f9f9',
    border: '#e5e5e5',
    secondary: '#f4f4f4',
    secondaryForeground: '#333333',
  }
};

const darkTheme = {
  colors: {
    primary: '#DAA520',
    background: '#1a1e2c',
    foreground: '#ffffff',
    card: '#1f2233',
    border: '#2c3049',
    secondary: '#1f2233',
    secondaryForeground: '#e5e5e5',
  }
};

export function EmotionProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [theme, setTheme] = useState(darkTheme);

  useEffect(() => {
    setTheme(resolvedTheme === 'dark' ? darkTheme : lightTheme);
  }, [resolvedTheme]);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
} 