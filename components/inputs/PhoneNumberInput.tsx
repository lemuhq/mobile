import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";

import inputStyles from "../../styles/input.styles";
import globalStyles from "../../styles/global.styles";
import { ThemeContext } from "@/provider/ThemeProvider";
import { Colors } from "@/constants/Colors";

export default function PhoneNumberInput({
	value,
	setValue,
}: {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
}) {
	const { isDarkMode, theme } = useContext(ThemeContext);
	const [focus, setFocus] = useState(false);

	const handlePhoneNumberChange = (text: any) => {
		// Restrict input to 11 characters
		if (text.length <= 11) {
			setValue(text);
		}
	};

	return (
		<View
			style={[
				inputStyles.container,
				{
					borderWidth: 1,
					borderColor: focus ? Colors.orange : Colors.whiteSmoke,
				},
			]}
		>
			<View style={inputStyles.countryContainer}>
				<Text style={inputStyles.miniText}>Country</Text>
				<View style={inputStyles.countryCodeWrapper}>
					<Image
						source={require(`../../assets/country.png`)}
						style={{ width: 20, height: 16 }}
					/>
					<Text
						style={{
							fontSize: 14,
							color: Colors.black,
							fontWeight: "600",
						}}
					>
						+234
					</Text>
				</View>
			</View>
			<View style={[globalStyles.divider, { height: "100%", width: 1 }]} />
			<View style={inputStyles.numberContainer}>
				<Text style={inputStyles.miniText}>Phone number</Text>
				<View style={{ width: "100%", flex: 1 }}>
					<TextInput
						placeholder="Enter Phone Number"
						style={inputStyles.phoneInput}
						value={value}
						keyboardType="numeric"
						onChangeText={handlePhoneNumberChange}
						maxLength={11}
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
					/>
				</View>
			</View>
		</View>
	);
}
