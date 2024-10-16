import { darkTheme, lightTheme } from "@/constants/Theme";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useColorScheme, Appearance } from "react-native";

interface ThemeContextTypes {
	theme: typeof darkTheme | typeof lightTheme;
	toggleTheme: () => void;
	isDarkMode: boolean;
}

export const ThemeContext = createContext<ThemeContextTypes>({
	theme: darkTheme,
	toggleTheme: () => {},
	isDarkMode: true,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const colorScheme = useColorScheme();
	const [isDarkMode, setIsDarkMode] = useState<boolean>(
		colorScheme === "dark"
	);
	const [theme, setTheme] = useState(isDarkMode ? darkTheme : lightTheme);

	useEffect(() => {
		setTheme(isDarkMode ? darkTheme : lightTheme);
	}, [isDarkMode]);

	useEffect(() => {
		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			setIsDarkMode(colorScheme === "dark");
		});

		return () => subscription.remove();
	}, []);

	const toggleTheme = () => {
		setIsDarkMode((prevMode) => !prevMode);
	};

	return (
		<ThemeContext.Provider
			value={{
				theme,
				toggleTheme,
				isDarkMode,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
