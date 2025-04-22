import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: string;
      background: string;
      foreground: string;
      card: string;
      border: string;
      secondary: string;
      secondaryForeground: string;
    }
  }
} 