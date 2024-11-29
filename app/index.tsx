import { View, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { router } from "expo-router";
import splashStyles from "@/styles/splashStyles.styles";
import { ThemeContext } from "@/provider/ThemeProvider";
import { StatusBar } from "expo-status-bar";
import { storage } from "@/utils/storage";

const App = () => {
	const { isDarkMode, theme } = useContext(ThemeContext);

	useEffect(() => {
		const prepare = async () => {
			const refreshTokenExist = await storage.getRefreshToken(
				"refreshToken"
			);

			const lockKeyExist = await storage.getLockPin();

			if (!lockKeyExist) {
				router.navigate("/onboarding");
			} else {
				if (refreshTokenExist) {
					router.navigate("/login/authUser");
				} else {
					router.navigate("/login");
				}
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
