import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ServiceType, ServiceTheme, StatusTheme } from './types';

type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  isDark: false,
});

export const useTheme = () => useContext(ThemeContext);

export const serviceThemes: Record<ServiceType, ServiceTheme> = {
  carpooling: {
    light: {
      bg: 'bg-green-500/10',
      text: 'text-green-500',
      hover: 'hover:bg-green-500/20',
      border: 'border-green-500/20',
      shadow: 'shadow-green-500/10',
      button: 'bg-green-500 hover:bg-green-600'
    },
    dark: {
      bg: 'bg-green-400/10',
      text: 'text-green-400',
      hover: 'hover:bg-green-400/20',
      border: 'border-green-400/20',
      shadow: 'shadow-green-400/10',
      button: 'bg-green-600 hover:bg-green-700'
    }
  },
  shopping: {
    light: {
      bg: 'bg-sunset/10',
      text: 'text-sunset',
      hover: 'hover:bg-sunset/20',
      border: 'border-sunset/20',
      shadow: 'shadow-sunset/10',
      button: 'bg-sunset hover:bg-sunset/90'
    },
    dark: {
      bg: 'bg-sunset/20',
      text: 'text-sunset',
      hover: 'hover:bg-sunset/30',
      border: 'border-sunset/30',
      shadow: 'shadow-sunset/20',
      button: 'bg-sunset hover:bg-sunset/90'
    }
  },
  'large-items': {
    light: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-500',
      hover: 'hover:bg-purple-500/20',
      border: 'border-purple-500/20',
      shadow: 'shadow-purple-500/10',
      button: 'bg-purple-500 hover:bg-purple-600'
    },
    dark: {
      bg: 'bg-purple-400/10',
      text: 'text-purple-400',
      hover: 'hover:bg-purple-400/20',
      border: 'border-purple-400/20',
      shadow: 'shadow-purple-400/10',
      button: 'bg-purple-600 hover:bg-purple-700'
    }
  }
} as const;

export const statusThemes: Record<'pending' | 'active' | 'completed' | 'in-transit', StatusTheme> = {
  pending: {
    light: {
      bg: 'bg-yellow-500/10',
      text: 'text-yellow-500',
      border: 'border-yellow-500/20',
      shadow: 'shadow-yellow-500/10'
    },
    dark: {
      bg: 'bg-yellow-400/10',
      text: 'text-yellow-400',
      border: 'border-yellow-400/20',
      shadow: 'shadow-yellow-400/10'
    }
  },
  active: {
    light: {
      bg: 'bg-green-500/10',
      text: 'text-green-500',
      border: 'border-green-500/20',
      shadow: 'shadow-green-500/10'
    },
    dark: {
      bg: 'bg-green-400/10',
      text: 'text-green-400',
      border: 'border-green-400/20',
      shadow: 'shadow-green-400/10'
    }
  },
  'in-transit': {
    light: {
      bg: 'bg-sunset/10',
      text: 'text-sunset',
      border: 'border-sunset/20',
      shadow: 'shadow-sunset/10'
    },
    dark: {
      bg: 'bg-sunset/20',
      text: 'text-sunset',
      border: 'border-sunset/30',
      shadow: 'shadow-sunset/20'
    }
  },
  completed: {
    light: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-500',
      border: 'border-purple-500/20',
      shadow: 'shadow-purple-500/10'
    },
    dark: {
      bg: 'bg-purple-400/10',
      text: 'text-purple-400',
      border: 'border-purple-400/20',
      shadow: 'shadow-purple-400/10'
    }
  }
} as const;

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'; 
    return localStorage.getItem('theme') as Theme ?? 
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};
