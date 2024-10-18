import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Route } from "@react-navigation/native";
import { BottomTabDescriptor } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { Colors } from "@/constants/Colors";
import TabBarButton from "./TabBarButton";
import { BORDERRADIUS, SPACING } from "@/constants/Theme";

interface BottomTabBarProps {
	state: {
		index: number; // Current active tab index
		routes: Array<Route<string>>; // Array of tab routes
	};
	navigation: any; // Navigation object to handle tab changes
	descriptors: Record<string, BottomTabDescriptor>; // Descriptions of each tab
	insets: {
		top: number;
		bottom: number;
		left: number;
		right: number;
	}; // Safe area insets
}

export interface RoutesProps {
	key: string;
	name?: string;
	params?: any;
}

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
	return (
		<View style={styles.container}>
			{state.routes.slice(0, 2).map((route, index) => {
				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};
				return (
					<TabBarButton
						{...route}
						key={route.key}
						isFocused={isFocused}
						onPress={onPress}
						onLongPress={onLongPress}
					/>
				);
			})}

			<TouchableOpacity>
				<View style={styles.scanButton}>
					<Image
						source={require(`@/assets/scan-icon.png`)}
						style={{
							resizeMode: "cover",
							width: "100%",
							height: "100%",
						}}
					/>
				</View>
			</TouchableOpacity>

			{state.routes.slice(2).map((route, index) => {
				const isFocused = state.index === index + 2;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};
				return (
					<TabBarButton
						{...route}
						key={route.key}
						isFocused={isFocused}
						onPress={onPress}
						onLongPress={onLongPress}
					/>
				);
			})}
		</View>
	);
};

export default TabBar;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		height: 98,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderTopWidth: 1,
		borderTopColor: Colors.silver,
		paddingHorizontal: SPACING.space_10 - 5,
	},
	scanButton: {
		width: 58,
		height: 58,
		overflow: "hidden",
		borderRadius: BORDERRADIUS.radius_25 * 2,
		marginHorizontal: SPACING.space_10,
	},
});
