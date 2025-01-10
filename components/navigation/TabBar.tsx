import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Route } from "@react-navigation/native";
import { BottomTabDescriptor } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { Colors } from "@/constants/Colors";
import TabBarButton from "./TabBarButton";
import { BORDERRADIUS, SPACING } from "@/constants/Theme";
import { ThemeContext } from "@/provider/ThemeProvider";
import ScanModal from "../modals/ScanModal";
import ProfileModal from "../modals/ProfileModal";
import { ModalContext } from "@/provider/ModalProvider";
import EmailVerificationModal from "../modals/EmailVerificationModal";
import BiometricsModal from "../modals/BiometricsModal";
import TransactionModal from "../modals/TransactionModal";
import { usePathname } from "expo-router";

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
	};
}

export interface RoutesProps {
	key: string;
	name?: string;
	params?: any;
}

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
	const { toggleScannerModal, toggleBiometrics } = useContext(ModalContext);
	const { isDarkMode, theme } = useContext(ThemeContext);
	const pathname = usePathname();

	// Example of currency formatting for Naira
	const formatToNaira = (amount: number) => {
		return `₦${amount.toLocaleString('en-NG')}`;
	}

	return (
		<>
			<BiometricsModal />
			<View
				style={[
					styles.container,
					{
						backgroundColor: isDarkMode ? Colors.gray : Colors.white,
					},
				]}
			>
				{state.routes.slice(0, 2).map((route, index) => {
					const firstRouteIndex = route.name.split("/")[0];
					const isFocused =
						state.index === index || pathname.includes(firstRouteIndex);

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

				<TouchableOpacity
					onPress={() => {
						//toggleBiometrics();
						//toggleScannerModal();
						navigation.navigate("scan/index");
					}}
				>
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

				{state.routes.slice(2, 4).map((route, index) => {
					const firstRouteIndex = route.name.split("/")[0];

					const isFocused =
						state.index === index + 2 ||
						pathname.includes(firstRouteIndex);

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
			<ScanModal />
			<ProfileModal />
			<EmailVerificationModal />
			<TransactionModal />

			{/* <ModalOverlay /> */}
		</>
	);
};

export default TabBar;

const styles = StyleSheet.create({
	container: {
		// backgroundColor: Colors.white,
		height: 63,
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
	contentContainer: {
		flex: 1,
		alignItems: "center",
	},
});
