import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { RoutesProps } from "./TabBar";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Colors } from "@/constants/Colors";
import { FONTSIZE, SPACING } from "@/constants/Theme";

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
			<FontAwesome5 name="user" size={24} color={props.color} {...props} />
		),
	};

	return (
		<Pressable onPress={onPress} style={styles.buttonContainer}>
			{Object.keys(icons).map(
				(icon, index) =>
					icon === customName && (
						<View style={{ marginLeft: 10 }} key={index}>
							{/*@ts-ignore*/}
							{icons[icon]({
								color: isFocused ? Colors.orange : Colors.black,
							})}
						</View>
					)
			)}
			<Text
				style={[
					styles.buttonLabel,
					{
						color: isFocused ? Colors.orange : Colors.black,
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
		flex: 1,
	},

	buttonLabel: {
		fontSize: FONTSIZE.size_14,
		textAlign: "center",
		marginLeft: 10,
		marginTop: SPACING.space_10 - 5,
		textTransform: "capitalize",
	},
});
