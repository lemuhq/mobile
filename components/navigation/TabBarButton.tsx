import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { RoutesProps } from "./TabBar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";
import { FONTSIZE, SPACING } from "@/constants/Theme";
import { ThemeContext } from "@/provider/ThemeProvider";

interface IProps {
	isFocused: boolean;
	onPress: () => void;
	onLongPress: () => void;
}

type BarButtonProps = RoutesProps & IProps;

export default function TabBarButton({
	key,
	name,
	isFocused,
	onPress,
}: BarButtonProps) {
	const customName: string = name?.split("/")[0]!;
	const { isDarkMode, theme } = useContext(ThemeContext);

	const icons = {
		home: (props: any) => (
			<MaterialIcons name="home" size={24} color={props.color} {...props} />
		),
		wallet: (props: any) => (
			<MaterialCommunityIcons
				name="wallet-outline"
				size={24}
				color={props.color}
				{...props}
			/>
		),
		history: (props: any) => (
			<MaterialIcons
				name="swap-horiz"
				size={24}
				color={props.color}
				{...props}
			/>
		),
		profile: (props: any) => (
			<Feather name="user" size={24} color={props.color} {...props} />
		),
	};

	return (
		<Pressable onPress={onPress} style={styles.buttonContainer}>
			{Object.keys(icons).map(
				(icon, index) =>
					icon === customName && (
						<View key={index}>
							{/*@ts-ignore*/}
							{icons[icon]({
								color: isFocused ? Colors.orange : theme.text,
							})}
						</View>
					)
			)}
			<Text
				style={[
					styles.buttonLabel,
					{
						color: isFocused ? Colors.orange : theme.text,
						fontFamily: isFocused ? "PoppinsSemiBold" : "PoppinsLight",
					},
				]}
			>
				{customName}
			</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		flex: 1,
	},

	buttonLabel: {
		fontSize: FONTSIZE.size_10,
		textAlign: "center",

		textTransform: "capitalize",
	},
});
