import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from 'expo-router';

export default function NFC() {
	const { amount, type } = useLocalSearchParams<{ amount: string; type: 'send' | 'receive' }>();
	
	// Now you can use amount and type in your component
	console.log('Amount:', amount);
	console.log('Transaction Type:', type);
	
	return (
		<View>
			<Text>NFC</Text>
		</View>
	);
}