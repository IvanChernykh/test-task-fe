import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';

import { Colors } from '@/utils/constants/colors';

const theme = createTheme({
  palette: {
    text: {
      primary: Colors.TEXT_WHITE,
      secondary: Colors.TEXT_WHITE,
    },
    primary: {
      main: Colors.MAIN_BASE,
      contrastText: Colors.BG_TEXT_CONTRAST,
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          ':hover': {
            background: Colors.BG_BASE_BRIGHT,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: Colors.BG_TEXT_CONTRAST,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          ':disabled': {
            background: Colors.BG_TEXT_CONTRAST,
            color: Colors.TEXT_DISABLED,
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          background: Colors.BG_TEXT_CONTRAST,
          borderRadius: '4px',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '.MuiSelect-icon': {
            color: Colors.TEXT_WHITE,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: Colors.TEXT_BLACK,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          background: Colors.BG_TEXT_CONTRAST,
        },
      },
    },
  },
});

export const MuiThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
