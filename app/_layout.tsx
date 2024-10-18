import React from "react";
import { Slot } from "expo-router";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const RootLayout = () => {
	const [loaded, error] = useFonts({
		PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
		PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
		PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
		PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
		PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
		PoppinsThin: require("../assets/fonts/Poppins-Thin.ttf"),
	});

	if (!loaded && !error) {
		return null;
	}

	return (
		<ThemeProvider>
			<Provider store={store}>
				<Slot />
			</Provider>
		</ThemeProvider>
	);
};

export default RootLayout;
