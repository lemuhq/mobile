import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import PinInputSheet from "@/components/PinInputSheet";

export default function CreatePin() {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [pin, setPin] = useState<number[]>([]);
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: theme.background,
				paddingHorizontal: Colors.spacing * 2,
			}}
		>
			<SafeAreaView style={{ flex: 1 }}>
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons
						name="arrow-back-outline"
						size={30}
						color={theme.text}
					/>
				</TouchableOpacity>
				<PinInputSheet
					header="Create Login Pin"
					subheader=" To log into your account securely, you need to create a login pin. Please don’t share this with anyone."
					pin={pin}
					setPin={setPin}
				/>
			</SafeAreaView>
			{/* <Text>CreatePin</Text> */}
		</View>
	);
}
