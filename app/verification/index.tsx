import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";
import globalStyles from "@/styles/global.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import PageHeader from "@/components/PageHeader";

export default function Verification() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: theme.background,
				paddingHorizontal: Colors.spacing * 2,
			}}
		>
			<SafeAreaView
				style={[
					{ flex: 1, gap: Colors.spacing * 2 },
					globalStyles.safeAreaViewStyles,
				]}
			>
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons
						name="arrow-back-outline"
						size={30}
						color={theme.text}
					/>
				</TouchableOpacity>

				<PageHeader
					header="Identy Verfication"
					subHeader="We need this information to upgrade your account and to legally verify who you are."
				/>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({});
