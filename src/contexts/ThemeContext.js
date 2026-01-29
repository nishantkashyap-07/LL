import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Always use dark mode
  const isDark = true;

  useEffect(() => {
    // Force dark mode on document
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  // Disabled toggle function (always returns dark mode)
  const toggleTheme = () => {
    // Do nothing - dark mode is forced
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

