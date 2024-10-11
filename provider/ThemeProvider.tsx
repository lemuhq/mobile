import { darkTheme, lightTheme } from "@/constants/Theme";
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextTypes {
	theme: any;
	toggleTheme: () => void;
	isDarkMode: boolean;
}

export const ThemeContext = createContext<ThemeContextTypes>({
	theme: null,
	toggleTheme: () => null,
	isDarkMode: true,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState(darkTheme);
	const [isDarkMode, setIsDarkMode] = useState(true);

	const handleToggle = () => {
		setIsDarkMode(!isDarkMode);
	};

	useEffect(() => {
		if (isDarkMode) {
			setTheme(darkTheme);
		} else {
			setTheme(lightTheme);
		}
	}, [isDarkMode]);

	return (
		<ThemeContext.Provider
			value={{
				theme: theme,
				toggleTheme: handleToggle,
				isDarkMode: isDarkMode,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
