import { View, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { router } from "expo-router";
import splashStyles from "@/styles/splashStyles.styles";
import { ThemeContext } from "@/provider/ThemeProvider";
import { StatusBar } from "expo-status-bar";

const App = () => {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const user = null;
	useEffect(() => {
		const prepare = async () => {
			await new Promise((resolve) => setTimeout(resolve, 2000));
			if (!user) {
				router.navigate("/onboarding");
			} else {
				router.navigate("/(tabs)/home");
			}
		};

		prepare();
	}, []);
	return (
		<View
			style={[
				splashStyles.pageContainer,
				{ backgroundColor: theme.splashBackground },
			]}
		>
			<StatusBar style="light" />
			<View style={splashStyles.logoContainer}>
				{isDarkMode ? (
					<Image
						source={require("../assets/SplashLogo.png")}
						style={splashStyles.logo}
					/>
				) : (
					<Image
						source={require("../assets/SplashLogoTwo.png")}
						style={splashStyles.logo}
					/>
				)}
			</View>
		</View>
	);
};

export default App;
