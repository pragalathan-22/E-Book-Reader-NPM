// ThemeContext.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const lightTheme = {
  colors: {
    background: '#FFFFFF',
    buttonBackground: '#E0E0E0',
    text: 'black',
  },
};

const darkTheme = {
  colors: {
    background:'#334155', // Dark background (top color)
    buttonBackground: '#131624', // Dark button background (bottom color)
    text: '#FFFFFF', // Text color for dark mode
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
