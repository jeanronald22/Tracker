import React, { createContext, useContext, useEffect, useState } from 'react';

type theme = 'dark' | 'light' | 'system';
type ThemeProviderProps = {
	children: React.ReactNode;
	defaulTheme?: theme;
	storageKey?: string; // car pas besoins de cle pour le type system
};
type ThemeProviderState = {
	theme: theme;
	setTheme: (theme: theme) => void;
};
const initialState: ThemeProviderState = {
	theme: 'system',
	setTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);
export function ThemeProvider({
	children,
	defaulTheme,
	storageKey,
	...props
}: ThemeProviderProps) {
	storageKey = storageKey || 'vite-ui-theme';
	const [theme, setTheme] = useState<theme>(
		() => (localStorage.getItem(storageKey) as theme) || defaulTheme
	); // recuperation du theme ou assigniation du theme par defaut
	useEffect(() => {
		const root = window.document.documentElement; //recuperation du noeud principale de notre page
		root.classList.remove('light', 'dark');
		//recuperation du theme du systeme
		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme:dark)')
				.matches
				? 'dark'
				: 'light';
			root.classList.add(systemTheme);
			return;
		}
		root.classList.add(theme);
	}, [theme]);
	const value = {
		theme,
		setTheme: (theme: theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
	};
	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}
export const useTheme = () => {
	const context = useContext(ThemeProviderContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};
