"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemePreferences } from '@/types';
import { useAuth } from './AuthContext';

// Default theme values
export const DEFAULT_THEME: ThemePreferences = {
    primaryColor: '#000000',
    backgroundColor: '#ffffff',
    fontFamily: 'Inter',
    buttonStyle: 'rounded'
};

interface ThemeContextType {
    theme: ThemePreferences;
    updateTheme: (updates: Partial<ThemePreferences>) => void;
    resetTheme: () => void;
    saveTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { user, updateProfile } = useAuth();
    const [theme, setTheme] = useState<ThemePreferences>(DEFAULT_THEME);

    // Load user's theme when user loads
    useEffect(() => {
        if (user && user.themePreferences) {
            setTheme(user.themePreferences);
        }
    }, [user]);

    const updateTheme = (updates: Partial<ThemePreferences>) => {
        setTheme(prev => ({ ...prev, ...updates }));
    };

    const resetTheme = () => {
        setTheme(DEFAULT_THEME);
    };

    const saveTheme = async () => {
        if (user) {
            await updateProfile({ themePreferences: theme });
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, updateTheme, resetTheme, saveTheme }}>
            <style jsx global>{`
                :root {
                    --theme-primary: ${theme.primaryColor};
                    --theme-background: ${theme.backgroundColor};
                    --theme-font: ${theme.fontFamily}, sans-serif;
                    --theme-btn-radius: ${theme.buttonStyle === 'rounded' ? '8px' :
                    theme.buttonStyle === 'pill' ? '50px' : '0px'
                };
                }
            `}</style>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
